'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublisherSchema extends Schema {
  up () {
    this.alter('publishers', (table) => {
      // alter table
      table.string('type', 80).notNullable().alter()
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
      table.string('type',255)
    })
  }
}

module.exports = PublisherSchema
