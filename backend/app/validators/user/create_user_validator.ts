import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class CreateUserValidator {
  static schema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    name: vine.string(),
  })

  static type: Infer<typeof CreateUserValidator.schema>

  static compile() {
    return vine.compile(CreateUserValidator.schema)
  }
}
