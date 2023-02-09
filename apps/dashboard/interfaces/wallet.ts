export interface Wallet {
  id: string;
  code_id: number;
  multisig_code_id: number;
  label: string;
  frozen: boolean;
  controllerAddr: string;
  relayers: string[];
  createdAt: string;
  updateAt: String;
}
