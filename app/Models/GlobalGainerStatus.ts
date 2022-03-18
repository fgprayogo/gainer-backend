import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GlobalGainerStatus extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public is_claim_open: boolean

  @column()
  public is_whitelist_open: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
