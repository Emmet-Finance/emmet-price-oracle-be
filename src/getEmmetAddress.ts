import { AddressBooks, RPCs, contractNames } from "./constants";
import { JsonRpcRequest, JsonRpcResponse, TChainName } from "./types";

export async function sendJsonRpcRequest<T>(url: string, method: string, params: any[]): Promise<T> {
    const requestBody: JsonRpcRequest = {
        jsonrpc: "2.0",
        method,
        params,
        id: 1
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json: JsonRpcResponse<T> = await response.json();

    if (json.error) {
        throw new Error(`RPC error! code: ${json.error.code}, message: ${json.error.message}`);
    }

    return json.result;
}

function stringToHex(str: string): string {
    let hexString = '';
    for (let i = 0; i < str.length; i++) {
        hexString += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hexString;
}

export async function getEmmetAddress(contractName: contractNames, chain: TChainName): Promise<string> {
    const rpcURL: string = RPCs[chain];
    const selector: string = '0x693ec85e';
    const offset: string = `${'20'.padStart(64, '0')}`;
    const length: string = contractName.length.toString(16).padStart(64, '0');
    const name: string = stringToHex(contractName).padEnd(64, '0');
    const params = [{
        to: AddressBooks[chain],
        data: `${selector}${offset}${length}${name}`
    }, "latest"];
    const address: string = await sendJsonRpcRequest(rpcURL, "eth_call", params);
    return address.replace('000000000000000000000000', '');
}
