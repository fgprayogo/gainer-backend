"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.PublicChatFactory = void 0;
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const PublicChat_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PublicChat"));
exports.PublicChatFactory = Factory_1.default
    .define(PublicChat_1.default, ({ faker }) => {
    return {
        message: faker.lorem.sentence(),
    };
})
    .build();
exports.UserFactory = Factory_1.default
    .define(User_1.default, ({ faker }) => {
    return {
        wallet_address: faker.internet.email(),
        name: faker.internet.userName(),
    };
})
    .relation('public_chats', () => exports.PublicChatFactory)
    .build();
//# sourceMappingURL=index.js.map