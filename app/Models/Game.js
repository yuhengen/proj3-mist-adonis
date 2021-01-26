'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
    publisher() {
      return this.belongsTo('App/Models/Publisher')
    }
}

module.exports = Game
