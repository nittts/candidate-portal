import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class ListUserValidator {
  static schema = vine.object({
    abilities: vine.array(vine.string()),
    name: vine.string(),
  })

  static type: Infer<typeof ListUserValidator.schema>

  static compile(data: unknown) {
    return vine.compile(ListUserValidator.schema).validate(data)
  }
}
