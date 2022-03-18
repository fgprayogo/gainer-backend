import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserListingHistories extends BaseSchema {
  protected tableName = 'user_listing_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('block_number').notNullable()
      table.string('trx_hash').notNullable()
      table.integer('token_id').notNullable()
      table.integer('amount').notNullable()
      table.bigInteger('listing_id').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
