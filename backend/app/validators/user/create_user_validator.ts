import { CreateAbilityValidator } from '#validators/ability/create_ability_validator'
import { CreateDegreeValidator } from '#validators/degree/create_degree_validator'
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class CreateUserValidator {
  static schema = vine.object({
    fullName: vine.string(),
    birthdate: vine.date({ formats: ['iso8601'] }),
    email: vine.string().email(),
    phone: vine.string(),
    address: vine.string(),
    cep: vine.string().maxLength(8),
    abilities: vine.array(CreateAbilityValidator.schema).optional(),
    degrees: vine.array(CreateDegreeValidator.schema).optional(),
  })

  static type: Infer<typeof CreateUserValidator.schema>

  static compile(data: unknown) {
    return vine.compile(CreateUserValidator.schema).validate(data)
  }
}
