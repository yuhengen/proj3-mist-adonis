'use strict'

const Publisher = use('App/Models/Publisher')

class PublisherController {
  index({view}){
    return view.render('publishers/index')
  }

  register({view}){
    return view.render('publishers/register')
  }
}

module.exports = PublisherController
