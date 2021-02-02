'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  transaction() {
    return this.belongsTo('App/Models/Transaction')
  }

  game() {
    return this.belongsTo('App/Models/Game')
  }
}

module.exports = Order
