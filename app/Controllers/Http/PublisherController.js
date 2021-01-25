'use strict'

const Publisher = use('App/Models/Publisher')
const { validateAll } = use('Validator')

class PublisherController {
  index({ view }) {
    return view.render('publishers/index')
  }

  register({ view }) {
    return view.render('publishers/register')
  }

  async processRegister({ request, response, session }) {
    const rules = {
      'username': 'required|min:8|max:30|alpha_numeric|unique:publishers',
      'password': 'required|min:8|confirmed',
      'contact_email': 'required|email|unique:publishers',
      'publisher_name': 'required'
    }

    const messages = {
      'username.required': 'Username is required',
      'username.min': 'Username needs to be at least 8 characters',
      'username.max': 'Username needs to be shorter than 30 characters',
      'username.unique': 'Username already exists',
      'username.alpha_numeric': 'Username can only be alphanumeric and cannot contain symbols',
      'password.required': 'Password is required',
      'password.confirmed': 'Password does not match'
    }

    let formData = request.post();

    const validation = await validateAll(formData, rules, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept([]);
      console.log(validation.messages())

      return response.redirect('back')
    }

    // let newPublisher = new Publisher();

    // newPublisher.username = formData.username;
    // newPublisher.password = formData.password;
    // newPublisher.contact_email = formData.contact_email;
    // newPublisher.publisher_name = formData.publisher_name;
    // newPublisher.verified = false;
  }
}

module.exports = PublisherController
