'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.table('games', (table) => {
      table.string('publisher',45).notNullable()
      table.string('developer',45).notNullable()
      // alter table
    })
  }

  down () {
    this.table('games', (table) => {
      // reverse alternations
      table.dropColumn('publisher')
      table.dropColumn('developer')
    })
  }
}

module.exports = GamesSchema
