import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory, PublicChatFactory } from 'Database/factories'

export default class UserAndChatSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await UserFactory.with('public_chats', 10).create()
  }
}
