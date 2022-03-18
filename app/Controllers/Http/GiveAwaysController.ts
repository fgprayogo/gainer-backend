import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GiveAway from 'App/Models/GiveAway'
import GlobalGainerStatus from 'App/Models/GlobalGainerStatus'


export default class GiveAwaysController {
    //
    // ─── ALL APPLICATIONS OF GIVEAWAY ───────────────────────────────────────────────
    //

    public async index({ response }: HttpContextContract) {
        const data = await GiveAway.all()
        return response.status(200).json({ status: "ok", data })
    }
    //
    // ─── ADD NEW GIVE AWAY ──────────────────────────────────────────────────────────
    //
    public async add({ request, response }: HttpContextContract) {
        try {
            const data = await GiveAway.create(request.body())
            return response.status(200).json({ status: "ok", data })
        } catch (error) {
            return response.status(400).json({ status: "error", reason: error })
        }
    }
    //
    // ─── FIND GIVE AWAY APPLICATION BY WALLET ───────────────────────────────────────
    //  
    public async findByWalletAddr({ request, response }: HttpContextContract) {
        const { wallet_address } = request.params()
        try {
            const data = await GiveAway.findByOrFail('wallet_address', wallet_address)
            return response.status(200).json({ status: "ok", data })
        } catch (error) {
            return response.status(400).json({ status: "error", reason: "not found" })
        }
    }
    //
    // ─── UPDATE GIVE AWAY STATUS ────────────────────────────────────────────────────
    //
    public async updateGiveAwayStatus({ request, response }: HttpContextContract) {
        const { wallet_addresses } = request.body()
        let updated_give_away: string[] = [];
        let not_updated_give_away: string[] = [];
        for (let wallet_address of wallet_addresses) {
            let user = await GiveAway.findBy('wallet_address', wallet_address);
            if (user) {
                user.isWhitelisted = true;
                user.save()
                updated_give_away.push(wallet_address)
            } else {
                not_updated_give_away.push(wallet_address)
            }
        }
        return response.status(200).json({ status: "ok", updated_give_away, not_updated_give_away })
    }

    public async checkStatus({ request, response }: HttpContextContract) {
        const data = await GlobalGainerStatus.all()
        return response.status(200).json({ status: "ok", data })
    }


}
