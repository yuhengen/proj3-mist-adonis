'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.table('games', (table) => {
      // alter table
      table.string('trailer', 254).notNullable()
    })
  }

  down () {
    this.table('games', (table) => {
      // reverse alternations
      table.dropColumn('trailer')
    })
  }
}

module.exports = GameSchema
