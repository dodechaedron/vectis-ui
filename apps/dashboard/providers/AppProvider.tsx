import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ChainProvider } from '@cosmos-kit/react-lite';

import assets from '~/configs/assets';
import { chains } from '~/configs/chains';
import { desktopWallets } from '~/configs/wallets';
import { ModalProvider, TranslationsProvider, VectisProvider } from '~/providers';

import ModalWallet from '~/components/Modals/WalletModal';

import { SidebarProvider } from './SidebarProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TranslationsProvider>
      <QueryClientProvider client={queryClient}>
        <ChainProvider assetLists={assets} chains={chains} walletModal={(props) => <ModalWallet {...props} />} wallets={desktopWallets}>
          <SidebarProvider>
            <ModalProvider>
              <VectisProvider>{children}</VectisProvider>
            </ModalProvider>
          </SidebarProvider>
        </ChainProvider>
      </QueryClientProvider>
    </TranslationsProvider>
  );
};

export default AppProvider;
