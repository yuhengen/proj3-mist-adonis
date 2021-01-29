'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.table('games', (table) => {
      // alter table
    })
  }

  down () {
    this.table('games', (table) => {
      // reverse alternations
    })
  }
}

module.exports = GamesSchema
