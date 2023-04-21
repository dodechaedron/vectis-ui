export interface VectisAccount {
  deployer: string;
  version: Version;
  guardians: string[];
  relayers: string[];
  nonce: number;
  label: string;
  codeId: number;
  frozen: boolean;
  controllerAddr: string;
  multisigAddress?: string;
  threshold: Threshold;
  chainName: string;
  address: string;
}

interface Threshold {
  weight: number;
  totalWeight: number;
}

interface Version {
  contract: string;
  version: string;
}
