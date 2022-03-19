import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import PublicChat from 'App/Models/PublicChat'
import User from 'App/Models/User'
import Ws from 'App/Services/Ws'

export default class PublicChatsController {
    public async showChat({ response }: HttpContextContract) {
        const chat = await PublicChat.query().limit(20).orderBy('id', 'desc').preload('sender')
        chat.reverse()
        return response.status(200).json({ status: "ok", chat })
    }
    public async loadCustomChat({ request, response }: HttpContextContract) {
        const { id } = request.params()
        const chat = await PublicChat.query().where('id', '<', id).limit(5).orderBy('id', 'desc').preload('sender')
        chat.reverse()
        return response.status(200).json({ status: "ok", chat })
    }
    public async addChat({ request, response }: HttpContextContract) {
        const { wallet_address, message } = request.body()
        try {
            const user: any = await User.findByOrFail('wallet_address', wallet_address)
            if (user) {
                const chats = await Database
                    .from('public_chats')
                    .count('* as total')

                if (chats[0].total > 10000) {
                    const old_chat = await PublicChat.first()
                    await old_chat?.delete()
                }
                const chat = await PublicChat.create({
                    user_id: user.$primaryKeyValue,
                    message: message
                })
                Ws.io.emit("message", { message: message, user_id: user.$primaryKeyValue, sender: { name: user.name, wallet_address: user.wallet_address } })
                return response.status(200).json({ status: "ok", chat })
            }
        } catch (error) {
            return response.status(400).json({ status: "error", reason: "not found" })
        }
    }
}
