import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GiveAways extends BaseSchema {
  protected tableName = 'give_aways'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('wallet_address').unique().notNullable()
      table.string('email').unique().notNullable()
      table.string('twitter_handle').unique().notNullable()
      table.string('telegram_handle').unique().notNullable()
      table.boolean('is_whitelisted').defaultTo(0).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
