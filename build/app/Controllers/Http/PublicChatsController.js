"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const PublicChat_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PublicChat"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Ws"));
class PublicChatsController {
    async showChat({ response }) {
        const chat = await PublicChat_1.default.query().limit(20).orderBy('id', 'desc').preload('sender');
        chat.reverse();
        return response.status(200).json({ status: "ok", chat });
    }
    async loadCustomChat({ request, response }) {
        const { id } = request.params();
        const chat = await PublicChat_1.default.query().where('id', '<', id).limit(5).orderBy('id', 'desc').preload('sender');
        chat.reverse();
        return response.status(200).json({ status: "ok", chat });
    }
    async addChat({ request, response }) {
        const { wallet_address, message } = request.body();
        try {
            const user = await User_1.default.findByOrFail('wallet_address', wallet_address);
            if (user) {
                const chats = await Database_1.default
                    .from('public_chats')
                    .count('* as total');
                if (chats[0].total > 10000) {
                    const old_chat = await PublicChat_1.default.first();
                    await old_chat?.delete();
                }
                const chat = await PublicChat_1.default.create({
                    user_id: user.$primaryKeyValue,
                    message: message
                });
                Ws_1.default.io.emit("message", { message: message, user_id: user.$primaryKeyValue, sender: { name: user.name, wallet_address: user.wallet_address } });
                return response.status(200).json({ status: "ok", chat });
            }
        }
        catch (error) {
            return response.status(400).json({ status: "error", reason: "not found" });
        }
    }
}
exports.default = PublicChatsController;
//# sourceMappingURL=PublicChatsController.js.map