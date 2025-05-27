/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('', () => 'get all users')
    router.post('', () => 'create user')
    router.post('activate', () => 'receives new password and activates user')
    router.get(':id', () => 'get specific user info')
    router.get('candidates', () => 'list all users that are candidates based on query search')
    router.get(':id/invites', () => 'returns user invites')
    router.post(':id/invite', () => 'send user invite email')
  })
  .prefix('user')
