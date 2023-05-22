import { ExecuteResult } from '@cosmjs/cosmwasm-stargate';
import { Coin } from '@cosmjs/stargate';

export interface ExecuteClient {
  execute(
    senderAddress: string,
    contractAddress: string,
    msg: any,
    fee: 'auto' | number,
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult>;
  sendTokens(senderAddress: string, recipientAddress: string, amount: readonly Coin[], fee: 'auto' | number, memo?: string): Promise<unknown>;
}
