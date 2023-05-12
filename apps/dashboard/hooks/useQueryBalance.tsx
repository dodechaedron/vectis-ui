import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useVectis } from '~/providers';

import { BalancesIndexer } from '@vectis/types';

export function useQueryBalance(): UseQueryResult<BalancesIndexer, unknown> {
  const { account, vectis, chain } = useVectis();

  const query = useQuery<BalancesIndexer>(
    ['vectis_account_balances', account?.address, vectis],
    () => vectis?.getBalances(account?.address as string),
    {
      enabled: Boolean(account) && account.address.startsWith(chain.bech32_prefix),
      initialData: () => ({ balances: [], totalBalance: { usd: '0', eur: '0' } })
    }
  );

  return query;
}
