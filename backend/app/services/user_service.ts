import User from '#models/user/user'
import { ActivateUserValidator } from '#validators/user/active_user_validator'
import { CreateUserValidator } from '#validators/user/create_user_validator'
import { FindUserByIdValidator } from '#validators/user/find_by_id_user_validator'
import { ListUserValidator } from '#validators/user/list_user_validator'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import { AbilityService } from './ability_service.js'
import { DegreeService } from './degree_service.js'

@inject()
export class UserService {
  constructor(
    private abilityService: AbilityService,
    private degreeService: DegreeService
  ) {}

  async index(params: typeof ListUserValidator.type) {
    const query = User.query()

    if (params.name) {
      query.where('name', params.name)
    }

    if (params.abilities) {
      query.whereHas('abilities', (abilityQuery) => {
        abilityQuery.whereIn('name', params.abilities)
      })
    }

    return await query.exec()
  }

  async create(userData: typeof CreateUserValidator.type) {
    const { abilities, degrees, birthdate, ...rest } = userData

    const user = await User.create({ ...rest, birthdate: DateTime.fromJSDate(new Date(birthdate)) })

    if (abilities) {
      await this.abilityService.createBulk(
        abilities.map((ability) => ({ ...ability, userId: user.id }))
      )
    }

    if (degrees) {
      await this.degreeService.createBulk(degrees.map((degree) => ({ ...degree, userId: user.id })))
    }

    return user
  }

  async activate(params: typeof ActivateUserValidator.type) {
    const user = await User.findOrFail(params.userId)

    user.active = true
    user.password = params.password

    await user.save()

    return user
  }

  async findById(params: typeof FindUserByIdValidator.type) {
    return await User.query()
      .where('id', params.id)
      .preload('abilities')
      .preload('degrees')
      .preload('receivedInvites')
      .preload('sentInvites')
      .exec()
  }
}
