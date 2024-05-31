
import { TChainName } from "./types"
import {readENV} from "./utils"

export const RPCs = {
    amoy: readENV("AMOY_RPC"),
    bscTestnet: readENV("BSC_TESTNET_RPC"),
}

export const supportedChains: TChainName[] = Object.keys(RPCs) as TChainName[];

export const AddressBooks = {
    amoy: '0x825614461b92baf13aDE3124793579f6e10EcC55',
    bscTestnet: '0x3564336Ad556295A368EEa2b2CA1a7D3f43B4029'
}

export type contractNames = 
    "GasFees"
    | "EmmetTokenVault"
    | "EmmetData"
    | "CCTPHelper"
    | "HashHelper"
    | "SignatureVerifier"
    | "LiquidityPoolHelper"
    | "EmmetBridge"
    | "AddressStorageHelper"
    | "WTON" // Wrapped Token
    | "EMMET" // Token
    | "TON/USD" // price feed
    | "BNB/USD" // price feed
    | "MATIC/USD" // Price Feed
    | "EmmetMultisig"

export const TOKENS = [
    {
        symbol: "TON",
        priceFeeds: [
            {
                chain: "bscTestnet",
                address: "0x1c75F80b024Cbe3799Eecc75f82E76551ce29CbB"
            },
            {
                chain: "amoy",
                address: "0x75E0Ba863E8954726D41999aF9A874A7fBF02eF1"
            },
        ]
    }
];