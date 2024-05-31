import {RPCs} from './constants';

export type TChainName = keyof typeof RPCs;

export interface Status {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
}

export interface Tag {
    slug: string;
    name: string;
    category: string;
}

export interface Quote {
    price: number;
    volume_24h: number;
    volume_change_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    tvl: number | null;
    last_updated: string;
}

export interface Platform {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
}

export interface Coin {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    num_market_pairs: number;
    date_added: string;
    tags: Tag[];
    max_supply: number | null;
    circulating_supply: number;
    total_supply: number;
    is_active: number;
    infinite_supply: boolean;
    platform: Platform | null;
    cmc_rank: number;
    is_fiat: number;
    self_reported_circulating_supply: number | null;
    self_reported_market_cap: number | null;
    tvl_ratio: number | null;
    last_updated: string;
    quote: {
        USD: Quote;
    };
}

export interface Data {
    [key: string]: Coin[];
}

export interface ApiResponse {
    status: Status;
    data: Data;
}

export interface JsonRpcRequest {
    jsonrpc: string;
    method: string;
    params: any[];
    id: number;
}

export interface JsonRpcResponse<T> {
    jsonrpc: string;
    id: number;
    result: T;
    error?: {
        code: number;
        message: string;
    };
}

