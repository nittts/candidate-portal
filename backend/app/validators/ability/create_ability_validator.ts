import { AbilityName } from '#models/ability/enums/ability_name'
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class CreateAbilityValidator {
  static schema = vine.object({
    name: vine.enum(AbilityName),
  })

  static type: Infer<typeof CreateAbilityValidator.schema>

  static compile(data: unknown) {
    return vine.compile(CreateAbilityValidator.schema).validate(data)
  }
}
