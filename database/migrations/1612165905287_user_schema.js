'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('publishers', (table) => {
      // alter table
      table.string('role',20).notNullable()
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
      table.dropColumn('role')
    })
  }
}

module.exports = UserSchema
