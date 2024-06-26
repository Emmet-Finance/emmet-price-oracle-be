import { ethers } from "ethers";
import { RPCs, evmSK } from "./constants";
import { TChainName } from "./types";

export type TChainWithSigner = {
    name: string,
    rpc: string,
    provider: ethers.JsonRpcProvider,
    signer: ethers.Wallet
}


export function evmChain(chainName: TChainName): TChainWithSigner {

    const rpc: string = RPCs[chainName];
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(evmSK, provider);

    return {
        name: chainName,
        rpc,
        provider,
        signer
    } as TChainWithSigner;

}