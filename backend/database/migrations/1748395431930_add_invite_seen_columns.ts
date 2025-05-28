import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invites'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('seen')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('seen')
    })
  }
}
