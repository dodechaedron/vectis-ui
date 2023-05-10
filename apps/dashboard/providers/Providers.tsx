import React, { PropsWithChildren } from 'react';

import { AppProvider, ChainProvider, ModalProvider, QueryProvider, TranslationsProvider, VectisProvider } from '~/providers';

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
