import { Wallet } from "./wallet";

export interface GuardianGroup {
  id: string;
  wallet: Wallet;
  guardians: string[];
  multisigCodeId?: number;
  multisigAddress?: string;
  createdAt: string;
}
