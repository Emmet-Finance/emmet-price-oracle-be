import { ethers } from 'ethers';
import cron from 'node-cron';
import {getTokenPrice, readENV, logToFile} from "./utils";
import {RPCs, TOKENS} from "./constants";
import { contractABI } from './ABI';

async function main() {

    for (const token of TOKENS){

        const price: number = await getTokenPrice(token.symbol) as number;
        console.log(token.symbol, price)

        for(const feed of token.priceFeeds){
            console.log(feed)
            const rpc: string = RPCs[feed.chain as keyof typeof RPCs];
            const provider = new ethers.JsonRpcProvider(rpc);
            const signer = new ethers.Wallet(readENV("SK"), provider);
            const contract = new ethers.Contract(
                feed.address,
                contractABI,
                signer
            );

            const answeredInRound = 1;
            const tx = await contract.updateTokenPrice(price, answeredInRound);
            await tx.wait();
            const message: string = `${token.symbol}, ${price}, ${feed.chain}`;
            logToFile(message);
            console.log(message)
        }
        
    }

}

// Schedule the job to run every 24 hours
cron.schedule('0 0 * * *', () => {
    logToFile('Running job to update price');
    main().catch(e => {
        console.error(e)
    });
});

// Do once immediately
main().catch(e => {
    console.error(e)
})