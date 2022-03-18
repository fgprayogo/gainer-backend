import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async addNewUser({ request, response }: HttpContextContract) {
        try {
            const data = await User.create(request.body())
            return response.status(200).json({ status: "ok", data })
        } catch (error) {
            return response.status(400).json({ status: "error", reason: error })
        }
    }
    public async checkUser({ request, response }: HttpContextContract) {
        const { wallet_address } = request.params()
        try {
            const data = await User.findByOrFail('wallet_address', wallet_address)
            return response.status(200).json({ status: "ok", data })
        } catch (error) {
            return response.status(400).json({ status: "error", reason: error })
        }
    }
}
