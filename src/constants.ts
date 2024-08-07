
import { TChainName } from "./types"
import { readENV } from "./utils"

export const RPCs = {
    amoy: readENV("AMOY_RPC"),
    // bscTestnet: readENV("BSC_TESTNET_RPC"),
    sepolia: readENV("SEPOLIA_RPC"),
    berachainbartio: readENV("BERACHAIN_BARTIO_RPC")
}

export const evmSK: string = readENV("SK");

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

export const SELECTORS = {
    latestAnswer: '0x50d25bcd'
}

export type TChainLinkToken =
    'AVAX'
    | 'BNB'
    | 'BTC'
    | 'DAI'
    | 'ETH'
    | 'FTM'
    | 'GLMR'
    | 'ICP'
    | 'IOTX'
    | 'MATIC'
    | 'NEAR'
    | 'OP'
    | 'SOL'
    | 'TON'
    | 'TRX'
    | 'USDC'
    | 'USDT'
    ;

export const CHAINLINK: {
    [key: TChainLinkToken | string]: {
        rpc: string,
        feed: string,
    }
} = {
    AVAX: {
        rpc: 'https://site2.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7'
    },
    BNB: {
        rpc: 'https://site1.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x14e613AC84a31f709eadbdF89C6CC390fDc9540A'
    },
    BTC: {
        rpc: 'https://site2.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c'
    },
    DAI: {
        rpc: 'https://site1.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x773616E4d11A78F511299002da57A0a94577F1f4'
    },
    ETH: {
        rpc: 'https://site2.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
    },
    FTM: {
        rpc: 'https://site1.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b'
    },
    GLMR: {
        rpc: 'https://moonbeam.api.onfinality.io/public',
        feed: '0x4497B606be93e773bbA5eaCFCb2ac5E2214220Eb'
    },
    ICP: {
        rpc: 'https://site1.moralis-nodes.com/polygon/f01c767669eb4e7ca2014842708d9271',
        feed: '0x84227A76a04289473057BEF706646199D7C58c34'
    },
    IOTX: {
        rpc: '',
        feed: '0x484A1b29ED1Ea038dBd75D7c7293714343363122'
    },
    MATIC: {
        rpc: 'https://site2.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676'
    },
    NEAR: {
        rpc:'https://site1.moralis-nodes.com/bsc/bba6916fc9c8448d9ea19431cbad3c1e',
        feed: '0x0Fe4D87883005fCAFaF56B81d09473D9A29dCDC3'
    },
    OP: {
        rpc: 'https://site1.moralis-nodes.com/optimism/d4f36500ec7f4895b06695a49d31638f',
        feed: '0x0D276FC14719f9292D5C1eA2198673d1f4269246'
    },
    SOL: {
        rpc: 'https://site1.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x4ffC43a60e009B551865A93d232E33Fce9f01507'
    },
    TON: {
        rpc: '',
        feed: ''
    },
    TRX: {
        rpc: 'https://site2.moralis-nodes.com/bsc/bba6916fc9c8448d9ea19431cbad3c1e',
        feed: '0xF4C5e535756D11994fCBB12Ba8adD0192D9b88be'
    },
    USDC: {
        rpc: 'https://site2.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6'
    },
    USDT: {
        rpc: 'https://site2.moralis-nodes.com/eth/08d56e3a62fd47759792972fcf0fc61f',
        feed:'0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46'
    }
}