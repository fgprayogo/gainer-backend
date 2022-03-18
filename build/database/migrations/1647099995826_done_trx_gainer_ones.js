"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class DoneTrxGainerOnes extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'done_trx_gainer_ones';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.bigInteger('block_number').notNullable();
            table.string('trx_hash').notNullable();
            table.string('seller_addr').notNullable();
            table.bigInteger('listing_id').notNullable();
            table.bigInteger('amount').notNullable();
            table.string('buyer_addr').notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = DoneTrxGainerOnes;
//# sourceMappingURL=1647099995826_done_trx_gainer_ones.js.map