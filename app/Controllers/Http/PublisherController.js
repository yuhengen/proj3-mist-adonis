'use strict'

const Publisher = use('App/Models/Publisher')

class PublisherController {
  index({view}){
    return view.render('publishers/index')
  }
}

module.exports = PublisherController
