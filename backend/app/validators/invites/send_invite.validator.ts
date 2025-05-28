import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class SendInviteValidator {
  static schema = vine.object({
    userId: vine.number().positive(),
  })

  static type: Infer<typeof SendInviteValidator.schema>

  static compile(data: unknown) {
    return vine.compile(SendInviteValidator.schema).validate(data)
  }
}
