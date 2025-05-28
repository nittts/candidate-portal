import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class FindUserByIdValidator {
  static schema = vine.object({
    id: vine.number().positive(),
  })

  static type: Infer<typeof FindUserByIdValidator.schema>

  static compile(data: unknown) {
    return vine.compile(FindUserByIdValidator.schema).validate(data)
  }
}
