import { wallets as keplrWallet } from '@cosmos-kit/keplr-extension';
import { wallets as vectisWallet } from '@cosmos-kit/vectis-extension';

export const desktopWallets = [...vectisWallet, ...keplrWallet];
