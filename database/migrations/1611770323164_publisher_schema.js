'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublisherSchema extends Schema {
  up () {
    this.table('publishers', (table) => {
      // alter table
      table.dropColumn('type')
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PublisherSchema
