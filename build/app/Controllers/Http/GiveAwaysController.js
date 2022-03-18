"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GiveAway_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GiveAway"));
const GlobalGainerStatus_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GlobalGainerStatus"));
class GiveAwaysController {
    async index({ response }) {
        const data = await GiveAway_1.default.all();
        return response.status(200).json({ status: "ok", data });
    }
    async add({ request, response }) {
        try {
            const data = await GiveAway_1.default.create(request.body());
            return response.status(200).json({ status: "ok", data });
        }
        catch (error) {
            return response.status(400).json({ status: "error", reason: error });
        }
    }
    async findByWalletAddr({ request, response }) {
        const { wallet_address } = request.params();
        try {
            const data = await GiveAway_1.default.findByOrFail('wallet_address', wallet_address);
            return response.status(200).json({ status: "ok", data });
        }
        catch (error) {
            return response.status(400).json({ status: "error", reason: "not found" });
        }
    }
    async updateGiveAwayStatus({ request, response }) {
        const { wallet_addresses } = request.body();
        let updated_give_away = [];
        let not_updated_give_away = [];
        for (let wallet_address of wallet_addresses) {
            let user = await GiveAway_1.default.findBy('wallet_address', wallet_address);
            if (user) {
                user.isWhitelisted = true;
                user.save();
                updated_give_away.push(wallet_address);
            }
            else {
                not_updated_give_away.push(wallet_address);
            }
        }
        return response.status(200).json({ status: "ok", updated_give_away, not_updated_give_away });
    }
    async checkStatus({ request, response }) {
        const data = await GlobalGainerStatus_1.default.all();
        return response.status(200).json({ status: "ok", data });
    }
}
exports.default = GiveAwaysController;
//# sourceMappingURL=GiveAwaysController.js.map