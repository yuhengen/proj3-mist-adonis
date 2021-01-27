'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.table('games', (table) => {
      // alter table
      table.dropColumn('preview_1')
      table.dropColumn('preview_2')
      table.dropColumn('preview_3')
      table.dropColumn('preview_4')
      table.dropColumn('preview_5')
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
