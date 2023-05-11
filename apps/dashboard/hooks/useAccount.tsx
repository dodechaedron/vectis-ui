import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useVectis } from '~/providers';

export const useAccount = () => {
  const { isReady, query, push: goToPage } = useRouter();
  const { vectis, chainName, isReady: isVectisReady, userAccounts } = useVectis();

  const {
    isIdle,
    isLoading,
    data: account
  } = useQuery(['vectis_account', query.vectis], () => vectis.getAccountInfo(query.vectis as string, chainName), {
    enabled: isReady && isVectisReady
  });

  useEffect(() => {
    if (!account) return;
    if (!userAccounts.includes(account.controllerAddr)) {
      goToPage('/');
    }
  }, [account]);

  return {
    isLoading: isIdle || isLoading,
    account
  };
};
