"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const factories_1 = global[Symbol.for('ioc.use')]("Database/factories");
class UserAndChatSeeder extends Seeder_1.default {
    async run() {
        await factories_1.UserFactory.with('public_chats', 10).create();
    }
}
exports.default = UserAndChatSeeder;
//# sourceMappingURL=UserAndChat.js.map