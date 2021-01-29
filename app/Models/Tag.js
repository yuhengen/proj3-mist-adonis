'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  games() {
    return this.belongsToMany('App/Models/Game')
  }
}

module.exports = Tag
