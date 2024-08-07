import { ethers } from 'ethers';
import cron from 'node-cron';
import { getTokenPrice, logToFile, sleep } from "./utils";
import { TOKENS } from "./constants";
import { contractABI } from './ABI';
import { getEmmetAddress } from './getEmmetAddress';
import { TChainWithSigner, evmChain } from './chains';
import { TChainName } from './types';

async function main() {

    try {

        // Chains get generated once
        const CHAINS: { [key: TChainName | string]: TChainWithSigner } = {
            amoy: evmChain('amoy'),
            sepolia: evmChain('sepolia'),
            berachainbartio: evmChain('berachainbartio')
        }


        for (const token of TOKENS) {

            let price: number;

            // Dealing with exceptions
            if (token.symbol == 'BERA') {
                price = await getTokenPrice('ETH') as number;
            } else {
                // CMC Supported tokens
                price = await getTokenPrice(token.symbol) as number;
            }

            // Regular loop
            for (const priceFeed of token.priceFeeds) {
                const chain = CHAINS[priceFeed.chain as TChainName];
                const feedAddress: string = await getEmmetAddress(priceFeed.name, chain.name as TChainName);
                console.log("feedAddress:", feedAddress, priceFeed.name, chain.name)
                const contract = new ethers.Contract(
                    feedAddress,
                    contractABI,
                    chain.signer
                );

                const tx = await contract.updateTokenPrice(BigInt(price), Math.round(Math.random() * 6) + 2);
                await tx.wait();

                logToFile(`${token.symbol}, ${price}, ${chain.name}`);
            }
            await sleep(6000);
        }

        // Irregular updates
        const caviPrice: number = 2847000000000;
        const caviAddress: string = "0x6222783A5470C0569A3538743BfBE30715a7c808";
        const caviFeed = new ethers.Contract(
            caviAddress,
            contractABI,
            CHAINS['sepolia'].signer
        );
        const tx = await caviFeed.updateTokenPrice(caviPrice, Math.round(Math.random() * 6) + 1);
        await tx.wait();
        logToFile(`$CAVI, ${caviPrice}, sepolia`);

    } catch (error:{message:string}|any) {
        console.log(error.message)
        await sleep(6000);
        main()
    }



}

// Schedule the job to run every 24 hours
cron.schedule('0 0 * * *', () => {
    logToFile('Running job to update price');
    main()
        .catch(e => {
            console.error(e)
            main()
        });
});

// Do once immediately
main().catch(e => {
    console.error(e)
})