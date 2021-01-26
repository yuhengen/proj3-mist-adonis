'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublisherSchema extends Schema {
  up () {
    this.alter('publishers', (table) => {
      // alter table
      table.string('username', 80).notNullable().unique().alter()
      table.string('contact_email', 254).notNullable().unique().alter()
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
      table.string('username', 20).notNullable()
      table.string('contact_email', 45).notNullable()
    })
  }
}

module.exports = PublisherSchema
