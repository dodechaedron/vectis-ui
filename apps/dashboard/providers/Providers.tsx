import React, { PropsWithChildren } from 'react';

import { ChainProvider } from '@cosmos-kit/react-lite';

import assets from '~/configs/assets';
import { chains } from '~/configs/chains';
import { desktopWallets } from '~/configs/wallets';
import { ModalProvider, QueryProvider, TranslationsProvider, VectisProvider } from '~/providers';

import ModalWallet from '~/components/Modals/WalletModal';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TranslationsProvider>
      <ChainProvider assetLists={assets} chains={chains} walletModal={(props) => <ModalWallet {...props} />} wallets={desktopWallets}>
        <VectisProvider>
          <QueryProvider>
            <ModalProvider>{children}</ModalProvider>
          </QueryProvider>
        </VectisProvider>
      </ChainProvider>
    </TranslationsProvider>
  );
};

export default Providers;
