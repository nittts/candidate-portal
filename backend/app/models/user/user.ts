import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'

import Ability from '#models/ability/ability'
import Degree from '#models/degree/degree'
import Invite from '#models/invite/invite'

import { UserType } from '#models/user/enums/user_type'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare birthdate: DateTime | null

  @column()
  declare email: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare cep: string

  @column({ serializeAs: null })
  declare password: string

  @column({ columnName: 'user_type' })
  declare userType: UserType

  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Ability)
  declare abilities: HasMany<typeof Ability>

  @hasMany(() => Degree)
  declare degrees: HasMany<typeof Degree>

  @hasMany(() => Invite, {
    foreignKey: 'candidate_id',
  })
  declare receivedInvites: HasMany<typeof Invite>

  @hasMany(() => Invite, {
    foreignKey: 'admin_id',
  })
  declare sentInvites: HasMany<typeof Invite>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
