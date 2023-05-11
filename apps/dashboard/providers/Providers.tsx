import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ChainProvider } from '@cosmos-kit/react-lite';

import assets from '~/configs/assets';
import { chains } from '~/configs/chains';
import { desktopWallets } from '~/configs/wallets';
import { ModalProvider, TranslationsProvider, VectisProvider } from '~/providers';

import ModalWallet from '~/components/Modals/WalletModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TranslationsProvider>
      <ChainProvider assetLists={assets} chains={chains} walletModal={(props) => <ModalWallet {...props} />} wallets={desktopWallets}>
        <QueryClientProvider client={queryClient}>
          <VectisProvider>
            <ModalProvider>{children}</ModalProvider>
          </VectisProvider>
        </QueryClientProvider>
      </ChainProvider>
    </TranslationsProvider>
  );
};

export default Providers;
