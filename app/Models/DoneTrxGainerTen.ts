import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DoneTrxGainerTen extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public block_number: number

  @column()
  public trx_hash: string

  @column()
  public seller_addr: string

  @column()
  public listing_id: number

  @column()
  public amount: number

  @column()
  public buyer_addr: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
