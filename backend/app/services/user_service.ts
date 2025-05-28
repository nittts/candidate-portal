import User from '#models/user/user'
import { ActivateUserValidator } from '#validators/user/active_user_validator'
import { CreateUserValidator } from '#validators/user/create_user_validator'
import { FindUserByIdValidator } from '#validators/user/find_by_id_user_validator'
import { ListUserValidator } from '#validators/user/list_user_validator'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import { AbilityService } from './ability_service.js'
import { DegreeService } from './degree_service.js'
import { randomUUID } from 'node:crypto'
import { UserType } from '#models/user/enums/user_type'
import Hash from '@adonisjs/core/services/hash'
import { MailService } from './mail_service.js'

@inject()
export class UserService {
  constructor(
    private abilityService: AbilityService,
    private degreeService: DegreeService,
    private mailService: MailService
  ) {}

  async index(params: typeof ListUserValidator.type) {
    const query = User.query()

    if (params.name) {
      query.whereILike('fullName', `%${params.name}%`)
    }

    if (Array.isArray(params.abilities) && params.abilities.length > 0) {
      query.whereHas('abilities', (abilityQuery) => {
        abilityQuery.whereIn('name', params.abilities as string[])
      })
    }

    query.where('userType', UserType.CANDIDATE)

    return await query.preload('abilities').exec()
  }

  async create(userData: typeof CreateUserValidator.type) {
    const { abilities, degrees, birthdate, ...rest } = userData

    const password = randomUUID()

    const doesExists = await User.findBy('email', userData.email)

    if (doesExists) {
      throw new Error('E-mail already exists')
    }

    const user = await User.create({
      ...rest,
      birthdate: DateTime.fromJSDate(new Date(birthdate)),
      password,
      active: false,
      userType: UserType.CANDIDATE,
    })

    if (abilities) {
      await this.abilityService.createBulk(
        abilities.map((ability) => ({ ...ability, userId: user.id }))
      )
    }

    if (degrees) {
      await this.degreeService.createBulk(degrees.map((degree) => ({ ...degree, userId: user.id })))
    }

    await this.mailService.sendCreatedUserEmail(user, password)

    return user
  }

  async activate(params: typeof ActivateUserValidator.type) {
    const user = await User.findOrFail(params.id)

    const isValidDefaultPassword = await Hash.verify(user.password, params.previousPassword)

    if (!isValidDefaultPassword) {
      throw new Error('Unauthorized')
    }

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
