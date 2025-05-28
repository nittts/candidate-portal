import type { HttpContext } from '@adonisjs/core/http'

import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { ListUserValidator } from '#validators/user/list_user_validator'
import { FindUserByIdValidator } from '#validators/user/find_by_id_user_validator'
import { CreateUserValidator } from '#validators/user/create_user_validator'
import { ActivateUserValidator } from '#validators/user/active_user_validator'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index(context: HttpContext) {
    const payload = await ListUserValidator.compile(context.request.qs())

    return this.userService.index(payload)
  }
  async findById(context: HttpContext) {
    const payload = await FindUserByIdValidator.compile(context.params)

    return this.userService.findById(payload)
  }

  async create(context: HttpContext) {
    const payload = await CreateUserValidator.compile(context.request.body())

    return this.userService.create(payload)
  }

  async activate(context: HttpContext) {
    const payload = await ActivateUserValidator.compile({
      ...context.request.params,
      ...context.request.body(),
    })

    return this.userService.activate(payload)
  }
}
