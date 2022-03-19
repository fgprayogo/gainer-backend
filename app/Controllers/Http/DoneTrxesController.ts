// @ts-nocheck
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import DoneTrxGainerOne from 'App/Models/DoneTrxGainerOne';
import DoneTrxGainerFive from 'App/Models/DoneTrxGainerFive';
import DoneTrxGainerTen from 'App/Models/DoneTrxGainerTen';
import PublicChat from 'App/Models/PublicChat';
import { ethers } from 'ethers'
const provider = new ethers.providers.JsonRpcProvider(Env.get('RPC'));
import GainerMarketplace from './utils/GainerMarketplace.json'
const gainerMarketplaceContract = new ethers.Contract(Env.get('GAINERMARKETPLACEADDRESS'), GainerMarketplace.abi, provider)


export default class DoneTrxesController {
    public async fetchDoneTrxGainerOne({ response }: HttpContextContract) {
        try {
            const last_block = await DoneTrxGainerOne.query().limit(1).orderBy('block_number', 'desc')
            const last_block_number = last_block[0].block_number;
            const prevTrxs = await gainerMarketplaceContract.queryFilter("DoneTrxGainerOne", last_block_number, 'latest');
            console.log(prevTrxs)

            for (let prevTrx of prevTrxs) {
                var listing = {
                    block_number: Number(prevTrx.blockNumber),
                    trx_hash: prevTrx.transactionHash,
                    seller_addr: prevTrx.args.sellerAddr,
                    listing_id: Number(prevTrx.args.listingId),
                    amount: Number(prevTrx.args.amount),
                    buyer_addr: prevTrx.args.buyerAddr
                }
                try {
                    const data = await DoneTrxGainerOne.findByOrFail("trx_hash", listing.trx_hash)
                    if (data.seller_addr !== listing.seller_addr && data.trx_hash !== listing.trx_hash) {
                        await DoneTrxGainerOne.create(listing);
                    }
                } catch (error) {
                    await DoneTrxGainerOne.create(listing);
                }
            }
        } catch (error) {

        }
        const done_trx_gainer_one = await DoneTrxGainerOne.query().limit(10).orderBy('block_number', 'desc')
        if (done_trx_gainer_one[0].ampunt == 0) {
            done_trx_gainer_one.pop(0)
        }
        return response.status(200).json({ done_trx_gainer_one })
    }
    public async fetchDoneTrxGainerFive({ response }: HttpContextContract) {
        try {
            const last_block = await DoneTrxGainerFive.query().limit(1).orderBy('block_number', 'desc')
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
                }
                try {
                    const data = await DoneTrxGainerFive.findByOrFail("trx_hash", listing.trx_hash)
                    if (data.seller_addr !== listing.seller_addr && data.trx_hash !== listing.trx_hash) {
                        await DoneTrxGainerFive.create(listing);
                    }
                } catch (error) {
                    await DoneTrxGainerFive.create(listing);
                }
            }
        } catch (error) {

        }
        const done_trx_gainer_five = await DoneTrxGainerFive.query().limit(10).orderBy('block_number', 'desc')
        if (done_trx_gainer_five[0].ampunt == 0) {
            done_trx_gainer_five.pop(0)
        }
        return response.status(200).json({ done_trx_gainer_five })
    }
    public async fetchDoneTrxGainerTen({ response }: HttpContextContract) {
        ;
        try {
            const last_block = await DoneTrxGainerTen.query().limit(1).orderBy('block_number', 'desc')
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
                }
                try {
                    const data = await DoneTrxGainerTen.findByOrFail("trx_hash", listing.trx_hash)
                    if (data.seller_addr !== listing.seller_addr && data.trx_hash !== listing.trx_hash) {
                        await DoneTrxGainerTen.create(listing);
                    }
                } catch (error) {
                    await DoneTrxGainerTen.create(listing);
                }
            }
        } catch (error) {

        }
        const done_trx_gainer_ten = await DoneTrxGainerTen.query().limit(10).orderBy('block_number', 'desc')
        if (done_trx_gainer_ten[0].ampunt == 0) {
            done_trx_gainer_ten.pop(0)
        }
        return response.status(200).json({ done_trx_gainer_ten })
    }
    public async tradingVolume24Hour({ response }: HttpContextContract) {
        const now = new Date()
        const yesterday = new Date(Date.now() - 86400 * 1000).toISOString()
        const date = await PublicChat.query().whereBetween('created_at', [yesterday, now])
        return response.status(200).json({ now, yesterday, date })
    }
}
