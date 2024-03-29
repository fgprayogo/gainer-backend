"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const DoneTrxGainerOne_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DoneTrxGainerOne"));
const DoneTrxGainerFive_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DoneTrxGainerFive"));
const DoneTrxGainerTen_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DoneTrxGainerTen"));
const PublicChat_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PublicChat"));
const ethers_1 = require("ethers");
const provider = new ethers_1.ethers.providers.JsonRpcProvider(Env_1.default.get('RPC'));
const GainerMarketplace_json_1 = __importDefault(require("./utils/GainerMarketplace.json"));
const gainerMarketplaceContract = new ethers_1.ethers.Contract(Env_1.default.get('GAINERMARKETPLACEADDRESS'), GainerMarketplace_json_1.default.abi, provider);
class DoneTrxesController {
    async fetchDoneTrxGainerOne({ response }) {
        try {
            const last_block = await DoneTrxGainerOne_1.default.query().limit(1).orderBy('block_number', 'desc');
            const last_block_number = last_block[0].block_number;
            const prevTrxs = await gainerMarketplaceContract.queryFilter("DoneTrxGainerOne", last_block_number, 'latest');
            for (let prevTrx of prevTrxs) {
                var listing = {
                    block_number: Number(prevTrx.blockNumber),
                    trx_hash: prevTrx.transactionHash,
                    seller_addr: prevTrx.args.sellerAddr,
                    listing_id: Number(prevTrx.args.listingId),
                    amount: Number(prevTrx.args.amount),
                    buyer_addr: prevTrx.args.buyerAddr
                };
                const data = await DoneTrxGainerOne_1.default.query().where("trx_hash", listing.trx_hash).andWhere("seller_addr", listing.seller_addr);
                if (data.length == 0) {
                    await DoneTrxGainerOne_1.default.create(listing);
                }
            }
        }
        catch (error) {
        }
        const done_trx_gainer_one = await DoneTrxGainerOne_1.default.query().limit(10).orderBy('block_number', 'desc');
        return response.status(200).json({ done_trx_gainer_one });
    }
    async fetchDoneTrxGainerFive({ response }) {
        try {
            const last_block = await DoneTrxGainerFive_1.default.query().limit(1).orderBy('block_number', 'desc');
            const last_block_number = last_block[0].block_number;
            const prevTrxs = await gainerMarketplaceContract.queryFilter("DoneTrxGainerFive", last_block_number, 'latest');
            for (let prevTrx of prevTrxs) {
                var listing = {
                    block_number: Number(prevTrx.blockNumber),
                    trx_hash: prevTrx.transactionHash,
                    seller_addr: prevTrx.args?.sellerAddr,
                    listing_id: Number(prevTrx.args?.listingId),
                    amount: Number(prevTrx.args?.amount),
                    buyer_addr: prevTrx.args?.buyerAddr
                };
                const data = await DoneTrxGainerFive_1.default.query().where("trx_hash", listing.trx_hash).andWhere("seller_addr", listing.seller_addr);
                if (data.length == 0) {
                    await DoneTrxGainerFive_1.default.create(listing);
                }
            }
        }
        catch (error) {
        }
        const done_trx_gainer_five = await DoneTrxGainerFive_1.default.query().limit(10).orderBy('block_number', 'desc');
        return response.status(200).json({ done_trx_gainer_five });
    }
    async fetchDoneTrxGainerTen({ response }) {
        try {
            const last_block = await DoneTrxGainerTen_1.default.query().limit(1).orderBy('block_number', 'desc');
            const last_block_number = last_block[0].block_number;
            const prevTrxs = await gainerMarketplaceContract.queryFilter("DoneTrxGainerTen", last_block_number, 'latest');
            for (let prevTrx of prevTrxs) {
                var listing = {
                    block_number: Number(prevTrx.blockNumber),
                    trx_hash: prevTrx.transactionHash,
                    seller_addr: prevTrx.args?.sellerAddr,
                    listing_id: Number(prevTrx.args?.listingId),
                    amount: Number(prevTrx.args?.amount),
                    buyer_addr: prevTrx.args?.buyerAddr
                };
                const data = await DoneTrxGainerTen_1.default.query().where("trx_hash", listing.trx_hash).andWhere("seller_addr", listing.seller_addr);
                if (data.length == 0) {
                    await DoneTrxGainerTen_1.default.create(listing);
                }
            }
        }
        catch (error) {
        }
        const done_trx_gainer_ten = await DoneTrxGainerTen_1.default.query().limit(10).orderBy('block_number', 'desc');
        return response.status(200).json({ done_trx_gainer_ten });
    }
    async tradingVolume24Hour({ response }) {
        const now = new Date();
        const yesterday = new Date(Date.now() - 86400 * 1000).toISOString();
        const date = await PublicChat_1.default.query().whereBetween('created_at', [yesterday, now]);
        return response.status(200).json({ now, yesterday, date });
    }
}
exports.default = DoneTrxesController;
//# sourceMappingURL=DoneTrxesController.js.map