'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublisherSchema extends Schema {
  up() {
    this.create('publishers', (table) => {
      table.increments()
      table.string('username', 20).notNullable()
      table.string('password', 45).notNullable()
      table.string('contact_email', 45).notNullable()
      table.string('publisher_name').notNullable()
      table.boolean('verified').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('publishers')
  }
}

module.exports = PublisherSchema
