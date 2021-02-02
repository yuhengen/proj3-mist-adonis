'use strict'

const Publisher = use('App/Models/Publisher')
const Game = use('App/Models/Game')
const Tag = use('App/Models/Tag')
const { validateAll } = use('Validator')
const Hash = use('Hash')
const Config = use('Config')

class PublisherController {
  // LOGIN PAGE
  index({ view }) {
    return view.render('publishers/index')
  }

  // PROCESS LOGIN
  async processLogin({ auth, request, response, session }) {
    let formData = request.post()

    // Check if username is empty
    if (!formData.username) {
      session.withErrors({ username: 'Username cannot be empty' }).flashExcept();
      return response.redirect('back')
    }

    // Access Publisher to see if username exists
    const user = await Publisher.findBy('username', formData.username);

    // If username does not exist in database
    if (!user) {
      session.withErrors({ username: 'Username does not exist' }).flashExcept();
      return response.redirect('back')
    }

    // Check if password is empty
    if (!formData.password) {
      session.withErrors({ password: 'Password cannot be empty' }).flashExcept();
      return response.redirect('back')
    }

    // Verify password
    const matchPassword = await Hash.verify(formData.password, user.password)

    // Check if password matches username
    if (!matchPassword) {
      session.withErrors({ password: 'Incorrect password' }).flashExcept();
      return response.redirect('back')
    }

    // Login
    await auth.authenticator('publisher').attempt(formData.username, formData.password);
    return response.route('publisher_games')
  }

  // GAMES PAGE
  async games({ auth, view, session, response }) {
    if (auth.user.role == 'publisher') {
      const publisher = await Publisher.find(auth.user.id)
      const games = await publisher.games().with('publisher').with('tags').fetch()

      return view.render('publishers/games', {
        'games': games.toJSON()
      })
    } else {
      session.flash({
        warning: `Unauthorized access`
      })

      return response.route('user_login')
    }
  }

  // ADD GAME FORM
  async addGame({ view, auth, session, response }) {
    if (auth.user.role == 'publisher') {
      let tags = await Tag.all()
      return view.render('publishers/add_game', {
        tags: tags.toJSON(),
        cloudinaryName: Config.get('cloudinary.name'),
        cloudinaryPreset: Config.get('cloudinary.preset'),
        cloudinaryApiKey: Config.get('cloudinary.api_key'),
        signUrl: '/cloudinary/sign'
      })
    } else {
      session.flash({
        warning: `Unauthorized access`
      })

      return response.route('user_login')
    }
  }

  // PROCESS ADD GAME
  async processAddGame({ auth, request, response, session }) {
    const rules = {
      'title': 'required|unique:games',
      'price': 'required',
      'release_date': 'required',
      'description': 'required',
      'developer': 'required',
      'tags': 'required',
      'trailer': 'required',
      'image': 'required',
    }

    const messages = {
      'title.required': 'Title is required',
      'title.unique': 'This game title already exists in our database',
      'price.required': 'Price is required',
      'price.above': 'Price needs to be more than 0',
      'release_date.required': 'Date of release is required',
      'description.required': 'Description is required',
      'developer.required': 'Developer is required',
      'tags.required': 'Please select at least 1 tag',
      'trailer.required': 'A trailer link is required',
      'image.required': 'A display image is required',
    }

    let formData = request.post()

    const validation = await validateAll(formData, rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept([]);

      return response.redirect('back')
    }

    let newGame = new Game()

    newGame.title = formData.title
    newGame.price = formData.price * 100
    newGame.release_date = formData.release_date
    newGame.description = formData.description
    newGame.developer = formData.developer
    newGame.trailer = formData.trailer
    newGame.image = formData.image
    newGame.publisher_id = auth.user.id
    newGame.verified = false

    await newGame.save()

    for (let t of formData.tags) {
      await newGame.tags().attach(t)
    }

    session.flash({
      notification: `${newGame.title} has been added and is pending approval`
    })
    return response.route('publisher_games')
  }

  // UPDATE GAME FORM
  async updateGame({ view, params, response, auth, session }) {
    if (auth.user.role == 'publisher') {
      let game = await Game.find(params.game_id)
      let tags = await Tag.all()
      let gametags = await game.tags().with('games').fetch()

      let tagArray = []
      for (let gt of gametags.toJSON()) {
        tagArray.push(gt.id)
      }

      try {
        if (auth.user.id == game.publisher_id) {
          return view.render('publishers/update_game', {
            tags: tags.toJSON(),
            gametags: gametags.toJSON(),
            tagArray: tagArray,
            game: game.toJSON(),
            cloudinaryName: Config.get('cloudinary.name'),
            cloudinaryPreset: Config.get('cloudinary.preset'),
            cloudinaryApiKey: Config.get('cloudinary.api_key'),
            signUrl: '/cloudinary/sign'
          })
        }
      } catch (error) {
        return response.status(400).json({
          status: 'error',
          message: 'Unauthorized access.'
        })
      }
    } else {
      session.flash({
        warning: `Unauthorized access`
      })

      return response.route('user_login')
    }
  }

  // PROCESS UPDATE GAME
  async processUpdateGame({ request, response, params, session }) {

    let game = await Game.find(params.game_id)
    let gametags = await game.tags().with('games').fetch()

    const rules = {
      'title': `required|unique:games,title,id,${game.id}`,
      'price': 'required',
      'description': 'required',
      'developer': 'required',
      'tags': 'required',
      'trailer': 'required',
      'image': 'required',
    }

    const messages = {
      'title.required': 'Title is required',
      'title.unique': 'This game title already exists in our database',
      'price.required': 'Price is required',
      'price.above': 'Price needs to be more than 0',
      'description.required': 'Description is required',
      'developer.required': 'Developer is required',
      'tags.required': 'Please select at least 1 tag',
      'trailer.required': 'A trailer link is required',
      'image.required': 'A display image is required',
    }

    let formData = request.post()

    const validation = await validateAll(formData, rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept([]);

      return response.redirect('back')
    }

    game.title = formData.title
    game.price = formData.price * 100
    game.description = formData.description
    game.developer = formData.developer
    game.trailer = formData.trailer
    game.image = formData.image

    game.save()

    let tagArray = []
    for (let gt of gametags.toJSON()) {
      tagArray.push(gt.id)
    }

    let newTags = []
    for (let tagID of formData.tags) {
      newTags.push(parseInt(tagID))
    }

    for (let gts of tagArray) {
      if (!newTags.includes(parseInt(gts))) {
        await game.tags().detach(gts)
      }
    }

    for (let tag of newTags) {
      if (tagArray.length !== 0) {
        if (!tagArray.includes(parseInt(tag))) {
          await game.tags().attach(tag)
        }
      } else {
        await game.tags().attach(tag)
      }
    }

    session.flash({
      notification: `${game.title} has been updated!`
    })

    return response.route('publisher_games')
  }

  // DELETE GAME PAGE
  async deleteGame({ auth, params, view, response, session }) {
    if (auth.user.role == 'publisher') {
      try {
        let game = await Game.find(params.game_id)

        if (auth.user.id == game.publisher_id) {
          return view.render('publishers/delete_game', {
            game: game.toJSON()
          })
        }
      } catch (error) {
        return response.status(400).json({
          status: 'error',
          message: 'Unauthorized access.'
        })
      }
    } else {
      session.flash({
        warning: `Unauthorized access`
      })

      return response.route('user_login')
    }
  }

  // PROCESS DELETE GAME
  async processDeleteGame({ params, response }) {
    let game = await Game.find(params.game_id)

    await game.tags().detach()
    await game.delete()

    response.route('publisher_games')
  }

  // PUBLISHER PROFILE PAGE
  async profile({ auth, view }) {
    if (auth.user.role == 'publisher') {
      const publisher = await Publisher.find(auth.user.id)

      return view.render('publishers/profile', {
        publisher: publisher.toJSON()
      })
    } else {
      session.flash({
        warning: `Unauthorized access`
      })

      return response.route('user_login')
    }
  }

  // PROCESS LOGOUT
  async processLogout({ auth, response }) {
    await auth.logout()
    return response.route('publisher_login')
  }

  // REGISTER FORM
  register({ view }) {
    return view.render('publishers/register')
  }

  // PROCESS REGISTER FORM
  async processRegister({ request, response, session }) {
    const rules = {
      'username': 'required|min:6|max:20|alpha_numeric|unique:publishers',
      'password': 'required|min:8|confirmed',
      'contact_email': 'required|unique:publishers',
      'publisher_name': 'required|unique:publishers'
    }

    const messages = {
      'username.required': 'Username is required',
      'username.min': 'Username must be between 6 and 20 characters',
      'username.max': 'Username must be between 6 and 20 characters',
      'username.unique': 'Username already exists',
      'username.alpha_numeric': 'Username can only contain alphanumeric characters',
      'password.required': 'Password is required',
      'password.min': 'Password must be at least 8 characters long',
      'password.confirmed': 'Passwords do not match',
      'contact_email.required': 'Contact email is required',
      'contact_email.unique': 'Email already exists',
      'publisher_name.required': 'Your publisher name is required',
      'publisher_name.unique': 'Publisher name already exists'
    }

    let formData = request.post();

    const validation = await validateAll(formData, rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept([]);

      return response.redirect('back')
    }

    let newPublisher = new Publisher();

    newPublisher.username = formData.username;
    newPublisher.password = formData.password;
    newPublisher.contact_email = formData.contact_email;
    newPublisher.publisher_name = formData.publisher_name;
    newPublisher.verified = false;
    newPublisher.role = 'publisher'

    await newPublisher.save()

    session.flash({
      notification: `${newPublisher.username} has been created`
    })

    return response.route('publisher_login')
  }

  reroute({ response }) {
    return response.route('publisher_login')
  }
}

module.exports = PublisherController
