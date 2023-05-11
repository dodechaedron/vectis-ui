import { useState } from 'react';
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';

import { useVectis } from '~/providers';

import GuardianActions from '~/components/GuardianActions';
import AccountListByGuardian from '~/components/GuardianWalletList';
import NotFound from '~/components/NotFound';
import Spinner from '~/components/Spinner';

import { UserGroupIcon } from '@heroicons/react/24/solid';

import type { NextPage } from 'next';
import { VectisAccount } from '~/interfaces';

const Guardian: NextPage = () => {
  const { vectis, userAddr, chainName } = useVectis();
  const [selectedAccount, setSelectedAccount] = useState<VectisAccount>();

  const { isLoading, data: accounts } = useQuery(
    ['accounts_by_guardians', chainName, userAddr],
    () => vectis?.getAccountsByGuardianAddr(chainName, userAddr),
    {
      enabled: Boolean(vectis),
      onSuccess: (accounts) => {
        const account = accounts.find((account) => account.address === selectedAccount?.address);
        setSelectedAccount(account);
      }
    }
  );

  return (
    <>
      <Head>
        <title>Vectis | Guardian</title>
      </Head>
      <div className="grid min-h-[calc(100vh-72px)] w-full grid-cols-1 gap-4 p-4 lg:grid-cols-3">
        <div className="col-span-1 flex rounded-md bg-white shadow-sm">
          {accounts?.length ? (
            <AccountListByGuardian accountList={accounts} onClickAccount={setSelectedAccount} />
          ) : (
            <div className="flex w-full items-center justify-center gap-4 p-4">
              {isLoading ? <Spinner size="md" /> : <NotFound icon={UserGroupIcon} text="You don't guardian other smart accounts" />}
            </div>
          )}
        </div>
        <div className="col-span-1 lg:col-span-2">
          <GuardianActions accountInfo={selectedAccount} />
        </div>
      </div>
    </>
  );
};

export default Guardian;
