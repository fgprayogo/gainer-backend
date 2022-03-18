import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AdminSeeder extends BaseSeeder {
  public async run () {
    const hashedPassword = await Hash.make("password")
    await Admin.create({email: "fitrohgalih@gmail.com", password: hashedPassword})
  }
}
