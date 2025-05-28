/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const InvitesController = () => import('#controllers/invites_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('', [UsersController, 'index'])
    router.post('', [UsersController, 'create'])
    router.post('/:id/activate', [UsersController, 'activate'])
    router.get(':id', [UsersController, 'findById'])
  })
  .prefix('user')

router
  .group(() => {
    router.get(':userId/new', [InvitesController, 'findNewInvitesCount'])
    router.get(':userId', [InvitesController, 'findByUserId'])
    router.post('/seen', [InvitesController, 'markAsSeen'])
    router.post(':userId', [InvitesController, 'sendInvite'])
  })
  .prefix('invites')

router
  .group(() => {
    router.post('token', [AuthController, 'login'])
  })
  .prefix('auth')
