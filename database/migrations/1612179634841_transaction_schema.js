'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('total_cost').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
      table.timestamps()
    })
  }

  down() {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
