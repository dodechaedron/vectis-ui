import React, { createContext, PropsWithChildren, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { chains } from '~/configs/chains';
import { useVectis, VectisContextState } from '~/providers';
import { protectedRoutes } from '~/utils/links';

import Spinner from '~/components/Spinner';

import { VectisAccount } from '~/interfaces';

export interface AppContextState extends VectisContextState {
  account: VectisAccount;
  isAuthorized: boolean;
}

const AppContext = createContext<AppContextState | null>(null);

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { query, pathname } = useRouter();
  const vectisContext = useVectis();

  const { chainName, vectis, setChain, userAccounts } = vectisContext;

  const { data: account, isLoading } = useQuery<VectisAccount>(['vectis_account', query.vectis], () =>
    vectis?.getAccountInfo(query.vectis as string, chainName)
  );

  const isAuthorized = useMemo(() => {
    if (!protectedRoutes.includes(pathname)) return true;
    return userAccounts.includes(account?.controllerAddr as string);
  }, [pathname, account]);

  useEffect(() => {
    if (!query.vectis) return;
    const [bech32Prefix] = (query.vectis as string).split('1');
    const chain = chains.find((c) => c.bech32_prefix === bech32Prefix);
    // TODO: Throw an error and control it
    if (!chain) return;
    setChain(chain.chain_name);
  }, [query.vectis]);

  if (isLoading) return <Spinner wrapper size="md" />;

  return (
    <AppContext.Provider
      value={
        {
          ...vectisContext,
          account,
          isAuthorized
        } as AppContextState
      }
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextState => {
  const context = React.useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};
