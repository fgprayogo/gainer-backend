import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GiveAway extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public walletAddress: String

  @column()
  public email: String

  @column()
  public twitterHandle: String

  @column()
  public telegramHandle: String

  @column()
  public isWhitelisted: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
