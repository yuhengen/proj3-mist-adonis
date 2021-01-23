'use strict'

const Game = use('App/Models/Game')

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
}

module.exports = GameController
