'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.table('games', (table) => {
      // alter table
      table.boolean('verified').notNullable()
    })
  }

  down () {
    this.table('games', (table) => {
      // reverse alternations
      table.dropColumn('verified')
    })
  }
}

module.exports = GameSchema
