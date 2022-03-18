import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import PublicChat from 'App/Models/PublicChat'

export const PublicChatFactory = Factory
  .define(PublicChat, ({ faker }) => {
    return {
      message: faker.lorem.sentence(),
    //   content: faker.lorem.paragraphs(4),
    }
  })
  .build()

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      wallet_address: faker.internet.email(),
      name: faker.internet.userName(),
    }
  })
  .relation('public_chats', () => PublicChatFactory) // 👈
  .build()