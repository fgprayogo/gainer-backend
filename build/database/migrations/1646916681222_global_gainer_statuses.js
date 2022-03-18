"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class GlobalGainerStatuses extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'global_gainer_statuses';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('event_name').notNullable();
            table.boolean('is_open').notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = GlobalGainerStatuses;
//# sourceMappingURL=1646916681222_global_gainer_statuses.js.map