"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Admin_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Admin"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
class AdminSeeder extends Seeder_1.default {
    async run() {
        const hashedPassword = await Hash_1.default.make("password");
        await Admin_1.default.create({ email: "fitrohgalih@gmail.com", password: hashedPassword });
    }
}
exports.default = AdminSeeder;
//# sourceMappingURL=Admin.js.map