import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import PublicChat from 'App/Models/PublicChat'

export default class User extends BaseModel {


  @column({ isPrimary: true })
  public id: number

  @column()
  public wallet_address: string

  @column()
  public name: string

  @hasMany(() => PublicChat, { foreignKey: "user_id" })
  public public_chats: HasMany<typeof PublicChat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
