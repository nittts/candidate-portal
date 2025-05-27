import { UserType } from '#models/user/enums/user_type'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('user_type', Object.values(UserType))
      table.boolean('active')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_type')
      table.dropColumn('active')
    })
  }
}
