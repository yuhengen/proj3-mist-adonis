'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('country',100).notNullable()
      table.string('contact_no',50).notNullable().unique()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('country')
      table.dropColumn('contact_no')
    })
  }
}

module.exports = UserSchema
