import { ExecuteResult } from '@cosmjs/cosmwasm-stargate';
import { Coin, OfflineDirectSigner } from '@cosmjs/proto-signing';
import {
  BaseAccount,
  ChainRestAuthApi,
  createTransaction,
  getTxRawFromTxRawOrDirectSignResponse,
  MsgExecuteContract,
  MsgSend,
  TxResponse,
  TxRestApi
} from '@injectivelabs/sdk-ts';

import { Endpoints } from '~/interfaces';
import { AccountDetails } from '@injectivelabs/sdk-ts/dist/cjs/types/auth';

export default class InjectiveClient {
  authApi: ChainRestAuthApi;
  txClient: TxRestApi;
  constructor(readonly signer: OfflineDirectSigner, readonly endpoints: Endpoints) {
    this.authApi = new ChainRestAuthApi(this.endpoints.restUrl);
    this.txClient = new TxRestApi(this.endpoints.restUrl);
  }

  async getAccountDetails(senderAddress: string): Promise<AccountDetails> {
    const accountDetails = await this.authApi.fetchAccount(senderAddress);
    return BaseAccount.fromRestApi(accountDetails);
  }

  async signAndBroadcast(senderAddress: string, message: any, memo?: string): Promise<TxResponse> {
    const { accountNumber, sequence } = await this.getAccountDetails(senderAddress);

    const [{ pubkey }] = await this.signer.getAccounts();

    const { signDoc } = createTransaction({
      pubKey: Buffer.from(pubkey).toString('base64'),
      accountNumber,
      sequence,
      message,
      chainId: 'injective-888',
      memo
    });

    try {
      const directSignResponse = await this.signer.signDirect(senderAddress, signDoc as any);
      const txRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);
      return await this.txClient.broadcast(txRaw);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async execute(
    senderAddress: string,
    contractAddress: string,
    msg: any,
    fee = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> {
    const message = MsgExecuteContract.fromJSON({
      contractAddress,
      sender: senderAddress,
      msg,
      funds: funds as { amount: string; denom: string }[]
    });
    const response = await this.signAndBroadcast(senderAddress, message, memo);
    return response as unknown as ExecuteResult;
  }

  async sendTokens(senderAddress: string, recipientAddress: string, amount: readonly Coin[], fee = 'auto', memo?: string) {
    const message = MsgSend.fromJSON({
      amount: amount[0],
      dstInjectiveAddress: recipientAddress,
      srcInjectiveAddress: senderAddress
    });

    const response = await this.signAndBroadcast(senderAddress, message, memo);
    return response as unknown as ExecuteResult;
  }
}
