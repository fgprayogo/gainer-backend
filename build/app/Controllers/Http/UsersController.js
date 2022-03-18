"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async addNewUser({ request, response }) {
        try {
            const data = await User_1.default.create(request.body());
            return response.status(200).json({ status: "ok", data });
        }
        catch (error) {
            return response.status(400).json({ status: "error", reason: error });
        }
    }
    async checkUser({ request, response }) {
        const { wallet_address } = request.params();
        try {
            const data = await User_1.default.findByOrFail('wallet_address', wallet_address);
            return response.status(200).json({ status: "ok", data });
        }
        catch (error) {
            return response.status(400).json({ status: "error", reason: error });
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map