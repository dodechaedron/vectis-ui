import React, { PropsWithChildren, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { wallets as keplrWallet } from '@cosmos-kit/keplr-extension';
import { ChainProvider } from '@cosmos-kit/react-lite';
import { wallets as vectisWallet } from '@cosmos-kit/vectis-extension';

import { ModalProvider, TranslationsProvider, VectisProvider } from '~/providers';
import assets from '~/utils/assets';
import chains from '~/utils/chains';

import ModalWallet from '~/components/Modals/WalletModal';

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
        <ChainProvider
          assetLists={assets}
          chains={chains}
          walletModal={(props) => <ModalWallet {...props} />}
          wallets={[...keplrWallet, ...vectisWallet]}
          endpointOptions={{
            endpoints: {
              junotestnet: {
                rest: ['https://rest.testcosmos.directory/junotestnet'],
                rpc: ['https://rpc.testcosmos.directory/junotestnet']
              },
              injectivetestnet: {
                rest: ['https://rest.testcosmos.directory/injectivetestnet'],
                rpc: ['https://rpc.testcosmos.directory/injectivetestnet']
              },
              neutrontestnet: {
                rest: ['https://rest.testcosmos.directory/neutrontestnet'],
                rpc: ['https://rpc.testcosmos.directory/neutrontestnet']
              },
              archwaytestnet: {
                rest: ['https://rest.testcosmos.directory/archwaytestnet'],
                rpc: ['https://rpc.testcosmos.directory/archwaytestnet']
              }
            }
          }}
        >
          <ModalProvider>
            <VectisProvider>{children}</VectisProvider>
          </ModalProvider>
        </ChainProvider>
      </QueryClientProvider>
    </TranslationsProvider>
  );
};

export default AppProvider;
