'use strict'

const Game = use('App/Models/Game')
const Config = use('Config')

class GameController {
  async index({ view }) {
    let allGames = await Game.all();
    return view.render('games/index', {
      'games': allGames.toJSON()
    })
  }

  async gamesapi() {
    let allGames = await Game.all();
    return allGames.toJSON()
  }

  add({ view }) {
    return view.render('games/create')
  }

  processAdd({ request, response }) {
    let formData = request.post();
    let newGame = new Game();

    newGame.title = formData.title
    newGame.price = formData.price*100
    newGame.release_date = formData.release_date
    newGame.description = formData.description
    newGame.publisher = formData.publisher
    newGame.publisher_id = 1
    newGame.developer = formData.developer
    newGame.image = formData.image
    newGame.preview_1 = formData.preview_1
    newGame.preview_2 = formData.preview_2
    newGame.preview_3 = formData.preview_3
    newGame.preview_4 = formData.preview_4
    newGame.preview_5 = formData.preview_5

    newGame.save();
    response.route('all_games')
  }
}

module.exports = GameController
