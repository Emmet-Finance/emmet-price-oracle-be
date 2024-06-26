
import { TChainName } from "./types"
import {readENV} from "./utils"

export const RPCs = {
    amoy: readENV("AMOY_RPC"),
    // bscTestnet: readENV("BSC_TESTNET_RPC"),
    sepolia: readENV("SEPOLIA_RPC"),
}

export const evmSK:string = readENV("SK");

export const supportedChains: TChainName[] = Object.keys(RPCs) as TChainName[];

export const AddressBooks = {
    amoy: '0xEA844fAF9a240Ac9911c1bd2204cd1536f7859b6',
    sepolia: '0x0F416Ea0661BfD7Ffb5b79259Bd98Bd4496a5558'
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
    | "GrabCoin/USD" // Price Feed

export const TOKENS = [
    {
        symbol: "TON",
        priceFeeds: [
            {
                chain: "amoy",
                name: "TON/USD" as contractNames
            },
            {
                chain: "sepolia",
                name: "TON/USD" as contractNames
            },
        ]
    },
    {
        symbol: "MATIC",
        priceFeeds: [
            {
                chain: "sepolia",
                name: "MATIC/USD" as contractNames
            },
        ]
    },
    {
        symbol: "GC",
        priceFeeds: [
            {
                chain: "sepolia",
                name: "GrabCoin/USD" as contractNames
            }
        ]
    }
];