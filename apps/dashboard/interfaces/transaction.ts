import { Coin } from '@cosmjs/amino';

export interface Transaction {
  txHash: string;
  timestamp: string;
  fee: Coin;
  funds: Coin;
  type: string;
}
