import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class MarkAsSeenValidator {
  static schema = vine.object({
    inviteIds: vine.array(vine.number().positive()),
  })

  static type: Infer<typeof MarkAsSeenValidator.schema>

  static compile(data: unknown) {
    return vine.compile(MarkAsSeenValidator.schema).validate(data)
  }
}
