"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/', 'GiveAwaysController.index');
    Route_1.default.get('/:wallet_address', 'GiveAwaysController.findByWalletAddr');
    Route_1.default.post('/', 'GiveAwaysController.add');
}).prefix('/api/giveaways');
Route_1.default.group(() => {
    Route_1.default.post('/add-user', 'UsersController.addNewUser');
    Route_1.default.get('/:wallet_address', 'UsersController.checkUser');
}).prefix('/api/user');
Route_1.default.group(() => {
    Route_1.default.get('/', 'PublicChatsController.showChat');
    Route_1.default.get('/:id', 'PublicChatsController.loadCustomChat');
    Route_1.default.post('/add-chat', 'PublicChatsController.addChat');
}).prefix('/api/chat');
Route_1.default.group(() => {
    Route_1.default.post('/login', 'AdminManagementsController.login');
    Route_1.default.post('/update-give-away-status', 'GiveAwaysController.updateGiveAwayStatus').middleware('auth');
}).prefix('/api/admin');
Route_1.default.group(() => {
    Route_1.default.get('/', 'GiveAwaysController.checkStatus');
}).prefix('/api/global-status');
Route_1.default.group(() => {
    Route_1.default.get('/gainer-one', 'DoneTrxesController.fetchDoneTrxGainerOne');
    Route_1.default.get('/gainer-five', 'DoneTrxesController.fetchDoneTrxGainerFive');
    Route_1.default.get('/gainer-ten', 'DoneTrxesController.fetchDoneTrxGainerTen');
}).prefix('/api/done-trx');
//# sourceMappingURL=routes.js.map