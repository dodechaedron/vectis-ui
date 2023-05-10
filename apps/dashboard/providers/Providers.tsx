import React, { PropsWithChildren } from 'react';

import { ChainProvider, ModalProvider, TranslationsProvider, VectisProvider } from '~/providers';

import AppProvider from './AppProvider';
import QueryProvider from './QueryProvider';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TranslationsProvider>
      <ChainProvider>
        <VectisProvider>
          <QueryProvider>
            <AppProvider>
              <ModalProvider>{children}</ModalProvider>
            </AppProvider>
          </QueryProvider>
        </VectisProvider>
      </ChainProvider>
    </TranslationsProvider>
  );
};

export default Providers;
