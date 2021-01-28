'use strict'

const Publisher = use('App/Models/Publisher')
const Game = use('App/Models/Game')
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
  async games({ auth, view }) {
    const publisher = await Publisher.find(auth.user.id)
    const games = await publisher.games().fetch()

    return view.render('publishers/games', {
      'games': games.toJSON()
    })
  }

  // ADD GAME FORM
  async addGame({ view }) {
    return view.render('publishers/add_game', {
      cloudinaryName: Config.get('cloudinary.name'),
      cloudinaryPreset: Config.get('cloudinary.preset'),
      cloudinaryApiKey: Config.get('cloudinary.api_key'),
      signUrl: '/cloudinary/sign'
    })
  }

  // PROCESS ADD GAME
  async processAddGame({ auth, request, response, session }) {
    const rules = {
      'title': 'required|unique:games',
      'price': 'required',
      'release_date': 'required',
      'description': 'required',
      'developer': 'required',
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
    newGame.publisher = auth.user.publisher_name
    newGame.developer = formData.developer
    newGame.trailer = formData.trailer
    newGame.image = formData.image
    newGame.publisher_id = auth.user.id
    newGame.verified = false

    await newGame.save()

    session.flash({
      notification: `${newGame.title} has been added and is pending approval`
    })

    return response.route('publisher_games')
  }

  // UPDATE GAME FORM
  async updateGame({ view, params, response, auth }) {
    try {
      let game = await Game.find(params.game_id)
      if (auth.user.id == game.publisher_id) {
        return view.render('publishers/update_game', {
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
  }

  // PROCESS UPDATE GAME
  async processUpdateGame({ request, response, params,session }) {

    let game = await Game.find(params.game_id)

    const rules = {
      'title': `required|unique:games,title,id,${game.id}`,
      'price': 'required',
      'description': 'required',
      'developer': 'required',
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

    session.flash({
      notification: `${game.title} has been updated!`
    })

    return response.route('publisher_games')
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
      'username.min': 'Username needs to be at least 6 characters',
      'username.max': 'Username needs to be shorter than 20 characters',
      'username.unique': 'Username already exists',
      'username.alpha_numeric': 'Username can only be alphanumeric and cannot contain spaces or symbols',
      'password.required': 'Password is required',
      'password.min': 'Password must be 8 characters or more',
      'password.confirmed': 'Passwords does not match',
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

    await newPublisher.save()

    session.flash({
      notification: `${newPublisher.username} has been created`
    })

    return response.route('publisher_login')
  }
}

module.exports = PublisherController
