import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useVectis } from './VectisProvider';

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { vectis } = useVectis();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: Boolean(vectis),
        refetchOnWindowFocus: false
      }
    }
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
