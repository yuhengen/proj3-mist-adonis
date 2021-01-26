'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.alter('publishers', (table) => {
      // alter table
      table.string('password', 60).notNullable().alter()
    })
  }

  down() {
    this.table('publishers', (table) => {
      // reverse alternations
      table.string('password', 45).notNullable().alter();
    })
  }
}

module.exports = UserSchema
