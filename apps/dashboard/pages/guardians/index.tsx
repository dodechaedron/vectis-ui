import { useQuery } from 'react-query';
import Head from 'next/head';

import { useVectis } from '~/providers';

import AccountListByGuardian from '~/components/GuardianWalletList';
import NotFound from '~/components/NotFound';
import Spinner from '~/components/Spinner';

import { UserGroupIcon } from '@heroicons/react/24/solid';

import type { NextPage } from 'next';

const Guardian: NextPage = () => {
  const { queryClient, userAddr, network } = useVectis();
  const { isLoading, data: accounts } = useQuery('accounts_by_guardians', () =>
    queryClient.getAccountsByGuardianAddr(network.chainName, userAddr)
  );

  return (
    <>
      <Head>
        <title>Vectis | Guardian</title>
      </Head>

      {accounts?.length ? (
        <div className="h-full rounded-md bg-white shadow-sm">
          <AccountListByGuardian accountList={accounts} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex h-full items-center justify-center rounded-md bg-white shadow xl:px-8 xl:py-14 ">
            {isLoading ? <Spinner size="lg" /> : <NotFound icon={UserGroupIcon} text="You don't guardian other smart accounts" />}
          </div>
        </div>
      )}
    </>
  );
};

export default Guardian;
