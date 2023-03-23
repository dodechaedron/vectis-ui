import { gql, request } from 'graphql-request';

import { Wallet } from 'interfaces';
import { GuardianGroup } from 'interfaces/guardians';

const INDEXER_URL = process.env.NEXT_PUBLIC_INDEXER_URL as string;

const queryUserWallets = gql`
  query myWallets($addr: String) {
    wallets(filter: { controllerAddr: { equalTo: $addr } }) {
      nodes {
        id
        codeId
        relayers
        label
        frozen
        createdAt
        updateAt
      }
    }
  }
`;

const queryWalletGuardians = gql`
  query guardians($walletId: String) {
    guardianGroups(filter: { walletId: { equalTo: $walletId } }) {
      nodes {
        id
        guardians
        multisigCodeId
        multisigAddress
        createdAt
        wallet {
          label
          controllerAddr
          frozen
        }
      }
    }
  }
`;

const queryGuardianGroupsByGuardianAddr = gql`
  query guardianGroupsByGuardianAddr($guardianAddr: String) {
    guardianGroups(filter: { guardians: { containsKey: $guardianAddr } }) {
      nodes {
        id
        guardians
        multisigCodeId
        multisigAddress
        createdAt
        wallet {
          id
          controllerAddr
          label
          frozen
        }
      }
    }
  }
`;

export const getUserWallets = async (addr: string): Promise<Wallet[]> => {
  const { wallets } = await request(INDEXER_URL, queryUserWallets, {
    addr
  });
  return wallets.nodes;
};

export const getWalletGuardians = async (walletId: string): Promise<GuardianGroup> => {
  const { guardianGroups } = await request(INDEXER_URL, queryWalletGuardians, {
    walletId
  });
  return guardianGroups.nodes[0];
};

export const getGuardianGroupsByGuardianAddr = async (guardianAddr: string): Promise<GuardianGroup[]> => {
  const { guardianGroups } = await request(INDEXER_URL, queryGuardianGroupsByGuardianAddr, {
    guardianAddr
  });
  return guardianGroups.nodes;
};
