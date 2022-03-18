"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UserListingHistories extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'user_listing_histories';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.bigInteger('block_number').notNullable();
            table.string('trx_hash').notNullable();
            table.integer('token_id').notNullable();
            table.integer('amount').notNullable();
            table.bigInteger('listing_id').notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UserListingHistories;
//# sourceMappingURL=1647363742187_user_listing_histories.js.map