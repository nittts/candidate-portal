import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { ListUserValidator } from '#validators/user/list_user_validator'
import { FindUserByIdValidator } from '#validators/user/find_by_id_user_validator'
import { CreateUserValidator } from '#validators/user/create_user_validator'
import { ActivateUserValidator } from '#validators/user/active_user_validator'
import { UserType } from '#models/user/enums/user_type'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index(context: HttpContext) {
    const { auth, request, response } = context
    const requestUser = await auth.authenticate()
    const payload = await ListUserValidator.compile(request.qs())

    if (requestUser.userType !== UserType.ADMIN) {
      response.abort('Invalid user type', 401)
    }

    return this.userService.index(payload)
  }
  async findById(context: HttpContext) {
    const { auth, request, response } = context
    const requestUser = await auth.authenticate()
    const payload = await FindUserByIdValidator.compile(request.params())

    if (requestUser.userType === UserType.CANDIDATE && requestUser.id !== payload.id) {
      response.abort('Forbidden Access', 403)
    }

    return this.userService.findById(payload)
  }

  async create(context: HttpContext) {
    const { request } = context
    const payload = await CreateUserValidator.compile(request.body())

    return this.userService.create(payload)
  }

  async activate(context: HttpContext) {
    const { request } = context
    console.log(request.params())

    const payload = await ActivateUserValidator.compile({
      ...request.params(),
      ...request.body(),
    })

    return this.userService.activate(payload)
  }
}
