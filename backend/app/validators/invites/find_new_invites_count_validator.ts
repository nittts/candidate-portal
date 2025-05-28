import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class FindnewInvitesCountValidator {
  static schema = vine.object({
    userId: vine.number().positive(),
  })

  static type: Infer<typeof FindnewInvitesCountValidator.schema>

  static compile(data: unknown) {
    return vine.compile(FindnewInvitesCountValidator.schema).validate(data)
  }
}
