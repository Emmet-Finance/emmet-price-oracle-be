import { ApiResponse, JsonRpcRequest, JsonRpcResponse } from './types';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config();

/**
 * Validates the key is present
 * @param key the .env lookup key
 * @param error the error message
 * @returns the value or throws an error
 */
export function readENV(key: string): string {

    const found = process.env[key];

    if (found) {
        return found;
    } else {
        throw new Error(`${key} is missing in .env`);
    }
}

export async function fetchData(url: string): Promise<ApiResponse> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getTokenPrice(symbol: string): Promise<number> {

    const apiKey: string = readENV("API_KEY");
    const url_part_one: string = readENV("URL_PART_ONE");
    const url_key: string = readENV("URL_KEY")

    const CMC_URL: string = `${url_part_one}${symbol}${url_key}${apiKey}`;

    const reply: ApiResponse = await fetchData(CMC_URL);

    // Convert to 14 decimals
    const price: number = reply.data[symbol][0].quote.USD.price * 1e14;

    // Remove fractions & return
    return Math.round(price);

}

export function logToFile(message: string) {
    const logFilePath = path.join(__dirname, 'price_update_log.txt');
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} | ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, { encoding: 'utf8' });
    console.log(logMessage)
}