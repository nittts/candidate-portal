import { AbilityName } from '#models/ability/enums/ability_name'
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class ListUserValidator {
  static schema = vine.object({
    abilities: vine.array(vine.enum(AbilityName)).optional(),
    name: vine.string().optional(),
  })

  static type: Infer<typeof ListUserValidator.schema>

  static compile(data: unknown) {
    return vine.compile(ListUserValidator.schema).validate(data)
  }
}
