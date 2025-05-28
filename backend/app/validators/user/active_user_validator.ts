import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class ActivateUserValidator {
  static schema = vine.object({
    userId: vine.number().positive(),
    password: vine.string(),
  })

  static type: Infer<typeof ActivateUserValidator.schema>

  static compile(data: unknown) {
    return vine.compile(ActivateUserValidator.schema).validate(data)
  }
}
