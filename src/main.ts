import { ethers } from 'ethers';
import cron from 'node-cron';
import {getTokenPrice, readENV, logToFile} from "./utils";
import {RPCs, TOKENS, supportedChains} from "./constants";
import { contractABI } from './ABI';
import { getEmmetAddress } from './getEmmetAddress';

async function main() {

    for (const token of TOKENS){

        const price: number = await getTokenPrice(token.symbol) as number;

        for(const chain of supportedChains){
            const rpc: string = RPCs[chain];
            const provider = new ethers.JsonRpcProvider(rpc);
            const signer = new ethers.Wallet(readENV("SK"), provider);
            const feedAddress: string = await getEmmetAddress(`TON/USD`, chain);
            const contract = new ethers.Contract(
                feedAddress,
                contractABI,
                signer
            );

            const answeredInRound = 1;
            const tx = await contract.updateTokenPrice(price, answeredInRound);
            await tx.wait();
            const message: string = `${token.symbol}, ${price}, ${chain}`;
            logToFile(message);
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