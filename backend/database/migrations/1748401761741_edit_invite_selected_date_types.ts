import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invites'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('selected_date').alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('selected_date').alter()
    })
  }
}
