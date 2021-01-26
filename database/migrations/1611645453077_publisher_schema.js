'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublisherSchema extends Schema {
  up () {
    this.table('publishers', (table) => {
      // alter table
      table.string('type', 80).notNullable()
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
      table.dropColumn('type')
    })
  }
}

module.exports = PublisherSchema
