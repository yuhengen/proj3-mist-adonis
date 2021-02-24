'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const Hash = use('Hash')

class UserController {
  async processRegister({ request, response, session }) {
    try {
      let formData = request.post()

      const rules = {
        'username': 'required|min:6|max:20|alpha_numeric|unique:users',
        'password': 'required|min:8|confirmed',
        'email': 'required|email|unique:users',
        'country': 'required',
        'contact_no': 'required|min:7|max:15|unique:users'
      }

      const messages = {
        'username.required': 'Username is required',
        'username.min': 'Username must be between 6 and 20 characters',
        'username.max': 'Username must be between 6 and 20 characters',
        'username.alpha_numeric': 'Username can only contain alphanumeric characters',
        'username.unique': 'Username already exists',
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 8 characters long',
        'password.confirmed': 'Passwords do not match',
        'email.email':'Invalid email address format',
        'email.required': 'Email address is required',
        'email.unique': 'Email address already exists',
        'country.required': 'Please select a country',
        'contact_no.required': 'Phone number is required',
        'contact_no.min': 'Phone number must be between 7 and 15 digits',
        'contact_no.max': 'Phone number must be between 7 and 15 digits',
        'contact_no.unique': 'Phone number is already in use'
      }

      const validation = await validateAll(formData, rules, messages)

      if (validation.fails()) {
        console.log(validation.messages())
        return response.send(validation.messages())
      }

      let newUser = new User();

      newUser.username = formData.username
      newUser.password = formData.password
      newUser.email = formData.email
      newUser.country = formData.country.label
      newUser.contact_no = formData.contact_no
      newUser.verified = false

      await newUser.save()

      return response.send(`Your account ${formData.username} has been created`)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = UserController
