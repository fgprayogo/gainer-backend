import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'

export default class AdminManagementsController {
    public async login({ auth, request, response }: HttpContextContract) {
        const { email, password } = request.body()
        
        try {
            const token = await auth.use('api').attempt(email, password)
            return token
        } catch {
            return response.badRequest('Invalid credentials')
        }
        // try {
        //     const data = await GiveAway.create(request.body())
        //     return response.status(200).json({ status: "ok", data })
        // } catch (error) {
        //     return response.status(400).json({ status: "error", reason: error })
        // }
    }
}
