import { MainWalletBase } from '@cosmos-kit/core';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as vectisWallets } from '@cosmos-kit/vectis';

export const wallets: MainWalletBase[] = [...vectisWallets, keplrWallets[0], cosmostationWallets[0]];
