
import { TChainName } from "./types"
import {readENV} from "./utils"

export const RPCs = {
    amoy: readENV("AMOY_RPC"),
    // bscTestnet: readENV("BSC_TESTNET_RPC"),
    sepolia: readENV("SEPOLIA_RPC"),
    berachainbartio: readENV("BERACHAIN_BARTIO_RPC")
}

export const evmSK:string = readENV("SK");

export const supportedChains: TChainName[] = Object.keys(RPCs) as TChainName[];

export const AddressBooks = {
    amoy: '0x8d948925A0CB920c965C3296Eb4aef31EfE32ce9', // '0xEA844fAF9a240Ac9911c1bd2204cd1536f7859b6'
    berachainbartio: '0x6b30f76CecE9F92D27f0e9Ad78312E77709E74A5',
    sepolia: '0x8b87FE2b3f3D9816432b34D5A6a30B1330594082' // '0x0F416Ea0661BfD7Ffb5b79259Bd98Bd4496a5558'
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
    | "WTON"        // Wrapped Token
    | "EMMET"       // Token
    | "TON/USD"     // price feed
    | "BNB/USD"     // price feed
    | "MATIC/USD"   // Price Feed
    | "BERA/USD"    // Price Feed
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
            {
                chain: "berachainbartio",
                name: "TON/USD" as contractNames
            }
        ]
    },
    {
        symbol: "MATIC",
        priceFeeds: [
            {
                chain: "sepolia",
                name: "MATIC/USD" as contractNames
            },
            {
                chain: "berachainbartio",
                name: "MATIC/USD" as contractNames
            }
        ]
    },
    {
        symbol: "BERA",
        priceFeeds: [
            {
                chain: "berachainbartio",
                name: "BERA/USD" as contractNames
            },
            {
                chain: "amoy",
                name: "BERA/USD" as contractNames
            },
            {
                chain: "sepolia",
                name: "BERA/USD" as contractNames
            }
        ]
    },
    {
        symbol: "ETH",
        priceFeeds: [
            {
                chain: "berachainbartio",
                name: "ETH/USD" as contractNames
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