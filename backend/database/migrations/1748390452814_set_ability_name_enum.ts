import { AbilityName } from '#models/ability/enums/ability_name'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'abilities'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('name', Object.values(AbilityName)).notNullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').notNullable().alter()
    })
  }
}
