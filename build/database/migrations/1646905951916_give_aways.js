"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class GiveAways extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'give_aways';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('wallet_address').unique().notNullable();
            table.string('email').unique().notNullable();
            table.string('twitter_handle').unique().notNullable();
            table.string('telegram_handle').unique().notNullable();
            table.boolean('is_whitelisted').defaultTo(0).notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = GiveAways;
//# sourceMappingURL=1646905951916_give_aways.js.map