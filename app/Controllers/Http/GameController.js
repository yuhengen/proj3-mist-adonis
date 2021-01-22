'use strict'

class GameController {
  index({ response }) {
    response.send("Hello from Games!")
  }
}

module.exports = GameController
