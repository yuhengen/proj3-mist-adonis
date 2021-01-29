'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameTagSchema extends Schema {
  up () {
    this.create('game_tag', (table) => {
      table.increments()
      // FK to Games
      table.integer('game_id').unsigned().notNullable();
      table.foreign('game_id').references('games.id');

      // FK to Tags
      table.integer('tag_id').unsigned().notNullable();
      table.foreign('tag_id').references('tags.id');
      table.timestamps()
    })
  }

  down () {
    this.drop('game_tag')
  }
}

module.exports = GameTagSchema
