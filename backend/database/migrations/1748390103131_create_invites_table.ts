import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('candidate_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('admin_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      table.dateTime('selected_date')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
