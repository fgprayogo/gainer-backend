/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// Route.get('/', "")

Route.group(() => {
  Route.get('/', 'GiveAwaysController.index')
  Route.get('/:wallet_address', 'GiveAwaysController.findByWalletAddr')
  Route.post('/', 'GiveAwaysController.add')
}).prefix('/api/giveaways')

Route.group(() => {
  Route.post('/add-user', 'UsersController.addNewUser')
  Route.get('/:wallet_address', 'UsersController.checkUser')
}).prefix('/api/user')

Route.group(() => {
  Route.get('/', 'PublicChatsController.showChat')
  Route.get('/:id', 'PublicChatsController.loadCustomChat')
  Route.post('/add-chat', 'PublicChatsController.addChat')
}).prefix('/api/chat')

Route.group(() => {
  Route.post('/login', 'AdminManagementsController.login')
  Route.post('/update-give-away-status', 'GiveAwaysController.updateGiveAwayStatus').middleware('auth')
}).prefix('/api/admin')

Route.group(() => {
  Route.get('/', 'GiveAwaysController.checkStatus')
}).prefix('/api/global-status')

Route.group(() => {
  Route.get('/gainer-one', 'DoneTrxesController.fetchDoneTrxGainerOne')
  Route.get('/gainer-five', 'DoneTrxesController.fetchDoneTrxGainerFive')
  Route.get('/gainer-ten', 'DoneTrxesController.fetchDoneTrxGainerTen')
}).prefix('/api/done-trx')