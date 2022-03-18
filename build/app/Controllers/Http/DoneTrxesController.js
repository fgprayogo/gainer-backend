"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DoneTrxGainerOne_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DoneTrxGainerOne"));
const DoneTrxGainerFive_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DoneTrxGainerFive"));
const DoneTrxGainerTen_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DoneTrxGainerTen"));
const ethers_1 = require("ethers");
const rpc = 'http://127.0.0.1:8545';
const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpc);
const gainerMarketplaceAddress = '0x09635F643e140090A9A8Dcd712eD6285858ceBef';
const GainerMarketplace_json_1 = __importDefault(require("./utils/GainerMarketplace.json"));
const gainerMarketplaceContract = new ethers_1.ethers.Contract(gainerMarketplaceAddress, GainerMarketplace_json_1.default.abi, provider);
class DoneTrxesController {
    async fetchDoneTrxGainerOne({ response }) {
        let last_block_number;
        try {
            const last_block = await DoneTrxGainerOne_1.default.query().limit(1).orderBy('block_number', 'desc');
            last_block_number = last_block[0].block_number;
            const prevTrxs = await gainerMarketplaceContract.queryFilter("DoneTrxGainerOne", last_block_number, 'latest');
            console.log(prevTrxs);
            for (let prevTrx of prevTrxs) {
                var listing = {
                    block_number: Number(prevTrx.blockNumber),
                    trx_hash: prevTrx.transactionHash,
                    seller_addr: prevTrx.args.sellerAddr,
                    listing_id: Number(prevTrx.args.listingId),
                    amount: Number(prevTrx.args.amount),
                    buyer_addr: prevTrx.args.buyerAddr
                };
                try {
                    const data = await DoneTrxGainerOne_1.default.findByOrFail("trx_hash", listing.trx_hash);
                    if (data.seller_addr !== listing.seller_addr && data.trx_hash !== listing.trx_hash) {
                        await DoneTrxGainerOne_1.default.create(listing);
                    }
                }
                catch (error) {
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
        let last_block_number;
        try {
            const last_block = await DoneTrxGainerFive_1.default.query().limit(1).orderBy('block_number', 'desc');
            last_block_number = last_block[0].block_number;
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
                try {
                    const data = await DoneTrxGainerFive_1.default.findByOrFail("trx_hash", listing.trx_hash);
                    if (data.seller_addr !== listing.seller_addr && data.trx_hash !== listing.trx_hash) {
                        await DoneTrxGainerFive_1.default.create(listing);
                    }
                }
                catch (error) {
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
        let last_block_number;
        try {
            const last_block = await DoneTrxGainerTen_1.default.query().limit(1).orderBy('block_number', 'desc');
            last_block_number = last_block[0].block_number;
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
                try {
                    const data = await DoneTrxGainerTen_1.default.findByOrFail("trx_hash", listing.trx_hash);
                    if (data.seller_addr !== listing.seller_addr && data.trx_hash !== listing.trx_hash) {
                        await DoneTrxGainerTen_1.default.create(listing);
                    }
                }
                catch (error) {
                    await DoneTrxGainerTen_1.default.create(listing);
                }
            }
        }
        catch (error) {
        }
        const done_trx_gainer_ten = await DoneTrxGainerTen_1.default.query().limit(10).orderBy('block_number', 'desc');
        return response.status(200).json({ done_trx_gainer_ten });
    }
}
exports.default = DoneTrxesController;
//# sourceMappingURL=DoneTrxesController.js.map