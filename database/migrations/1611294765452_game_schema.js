'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up() {
    this.create('games', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.integer('price').unsigned().notNullable()
      table.date('release_date').notNullable()
      table.text('description').notNullable()
      table.string('publisher',45).notNullable()
      table.string('developer',45).notNullable()
      table.string('image', 200).notNullable()
      table.string('preview_1', 200).notNullable()
      table.string('preview_2', 200).notNullable()
      table.string('preview_3', 200).notNullable()
      table.string('preview_4', 200).nullable()
      table.string('preview_5', 200).nullable()
      table.boolean('verified').notNullable()

      table.integer('publisher_id').unsigned().notNullable();
      table.foreign('publisher_id').references('publishers.id');
      // table.string('username', 30).notNullable();
      // table.string('email', 45).notNullable();
      // table.string('password', 45).notNullable();
      // table.string('contact_no', 20).notNullable();
      // table.string('country', 30).notNullable();
      // table.date('date_of_birth').notNullable();
      // table.datetime('register_date').notNullable();
      // table.smallInteger('wallet').defaultTo(0).notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('games')
  }
}

module.exports = GameSchema
