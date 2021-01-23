'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.table('games', (table) => {
      table.string('country',30).notNullable()
      // alter table
    })
  }

  down () {
    this.table('games', (table) => {
      // reverse alternations
      table.dropColumn('country')
    })
  }
}

module.exports = GamesSchema
