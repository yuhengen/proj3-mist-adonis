'use strict'

const Game = use('App/Models/Game')
const Publisher = use('App/Models/Publisher')
const Tag = use('App/Models/Tag')
const Config = use('Config')

class GameController {
  async index({ view, auth }) {
    try {
      auth.user = await auth.getUser()
    } catch (e) {

    }

    if (auth.user) {
      let allGames = await Game.all();
      return view.render('games/index', {
        'games': allGames.toJSON(),
        'user': auth.user
      })
    } else {
      let allGames = await Game.all();
      return view.render('games/index', {
        'games': allGames.toJSON()
      })
    }
  }

  async gamesapi() {
    let gamesData = await Game.query().with('publisher', (builder) => builder.select('id', 'publisher_name', 'contact_email')).with('tags', (builder) => builder.select('id', 'tag_name')).fetch()
    return gamesData.toJSON()
  }
}

module.exports = GameController
