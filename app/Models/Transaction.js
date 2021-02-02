'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  orders() {
    return this.hasMany('App/Models/Order')
  }
}

module.exports = Transaction
