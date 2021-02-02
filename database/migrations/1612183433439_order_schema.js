'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.increments()
      table.integer('price').unsigned().notNullable()
      table.integer('game_id').unsigned().notNullable()
      table.foreign('game_id').references('games.id')
      table.integer('transaction_id').unsigned().notNullable()
      table.foreign('transaction_id').references('transactions.id')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('orders')
  }
}

module.exports = OrderSchema
