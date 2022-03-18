import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DoneTrxGainerOnes extends BaseSchema {
  protected tableName = 'done_trx_gainer_ones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('block_number').notNullable()
      table.string('trx_hash').notNullable()
      table.string('seller_addr').notNullable()
      table.bigInteger('listing_id').notNullable()
      table.bigInteger('amount').notNullable()
      table.string('buyer_addr').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
