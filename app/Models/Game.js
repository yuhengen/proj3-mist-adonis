'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  static get dates() {
    return super.dates.concat(['release_date'])
  }

  static castDates(field, value) {
    if (field === 'release_date') {
      return value.format('DD MMM YYYY')
    }

    return super.formatDates(field, value)
  }

  publisher() {
    return this.belongsTo('App/Models/Publisher')
  }

  tags() {
    return this.belongsToMany('App/Models/Tag')
  }
}

module.exports = Game
