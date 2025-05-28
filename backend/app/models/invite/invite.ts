import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user/user'

export default class Invite extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ columnName: 'selected_date' })
  declare selectedDate: DateTime

  @column({ columnName: 'candidate_id' })
  declare candidateId: number

  @column({ columnName: 'admin_id' })
  declare adminId: number

  @column()
  declare seen: boolean

  @belongsTo(() => User, {
    foreignKey: 'candidateId',
  })
  declare candidate: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'adminId',
  })
  declare admin: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
