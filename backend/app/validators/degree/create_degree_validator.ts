import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export class CreateDegreeValidator {
  static schema = vine.object({
    name: vine.string(),
    institutionName: vine.string(),
    graduationDate: vine.date(),
  })

  static type: Infer<typeof CreateDegreeValidator.schema>

  static compile(data: unknown) {
    return vine.compile(CreateDegreeValidator.schema).validate(data)
  }
}
