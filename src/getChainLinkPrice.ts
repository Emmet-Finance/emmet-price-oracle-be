import { CHAINLINK, SELECTORS, TChainLinkToken } from "./constants";
import { sleep } from "./utils";

/**
 * Returns a token price with 14 decimal prescision
 * @param token the name of the token
 * @returns the price with 14 decimals
 */
export async function getChainLinkPrice(token: TChainLinkToken): Promise<number> {

    let price: number = 0;

    try {

        const body = {
            "jsonrpc": "2.0",
            "method": "eth_call",
            "params": [{
                "to": CHAINLINK[token].feed,
                "data": SELECTORS.latestAnswer
            }, "latest"],
            "id": 1
        };

        const response = await fetch(CHAINLINK[token].rpc, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if(response && response.status == 200){

            const rawJSON = await response.json();
            const rawInt = rawJSON.result;

            price = Number(rawInt.toString(16));
        }

    } catch (error: { message: string } | any) {
        console.log(error.message);
        await sleep(1000);
        return await getChainLinkPrice(token);
    }

    return price * 10 ** 6;

}

// getChainLinkPrice('AVAX')
// .then(result => {
//     console.log(result)
// })