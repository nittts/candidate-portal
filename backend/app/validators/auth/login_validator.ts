import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class LoginValidator {
  static schema = vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })

  static type: Infer<typeof LoginValidator.schema>

  static compile(data: unknown) {
    return vine.compile(LoginValidator.schema).validate(data)
  }
}
