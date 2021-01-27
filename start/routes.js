'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// Publisher portal
Route.get('publisher/', 'PublisherController.index').as('publisher_login')
Route.post('publisher/', 'PublisherController.processLogin')
Route.get('publisher/register', 'PublisherController.register').as('publisher_register')
Route.post('publisher/register', 'PublisherController.processRegister')
Route.get('publisher/logout', 'PublisherController.processLogout').as('publisher_logout')
Route.get('publisher/games', 'PublisherController.games').as('publisher_games').middleware('auth:publisher')
Route.get('publisher/games/add','PublisherController.addGame').as('publisher_add_game').middleware('auth:publisher')
Route.post('publisher/games/add', 'PublisherController.processAdd').middleware('auth:publisher')

// Cloudinary routes
Route.get('cloudinary/sign', 'CloudinaryController.sign').as('cloudinary_sign')


Route.get('games/', 'GameController.index').as('all_games')
Route.get('games-api/', 'GameController.gamesapi')
Route.get('games/add', 'GameController.add').as('add_game')
Route.post('games/add', 'GameController.processAdd')
