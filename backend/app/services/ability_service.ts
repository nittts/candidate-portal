import Ability from '#models/ability/ability'
import { CreateAbilityValidator } from '#validators/ability/create_ability_validator'
import { inject } from '@adonisjs/core'

@inject()
export class AbilityService {
  async createBulk(abilities: (typeof CreateAbilityValidator.type)[]) {
    await Ability.createMany(abilities)
  }
}
