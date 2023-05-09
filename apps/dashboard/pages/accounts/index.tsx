import { Suspense } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Head from 'next/head';
import Link from 'next/link';

import { useTranslations, useVectis } from '~/providers';

import SmartAccountCard from '~/components/SmartAccountCard';
import Spinner from '~/components/Spinner';

import { IoAddCircleOutline } from 'react-icons/io5';

import type { NextPage } from 'next';

const ListWallets: NextPage = () => {
  const { t } = useTranslations();
  const queryClient = useQueryClient();
  const { signingClient, userAddr } = useVectis();
  const { data: accounts, isLoading } = useQuery(['vectis_accounts', userAddr], () => signingClient.getAccounts([userAddr]), {
    enabled: !!signingClient,
    onSuccess: (accounts) => accounts.forEach((account) => queryClient.setQueryData(['vectis_accounts', account.address], account))
  });

  return (
    <>
      <Head>
        <title>Vectis | Wallets</title>
      </Head>

      <div className="flex h-full flex-col">
        <Link
          href="/accounts/create"
          passHref={true}
          className="hover:bg-mirage-100/30 border-black-300 mx-auto flex h-[12rem] w-full max-w-[24rem] flex-col items-center justify-center rounded-md border-2 border-dashed py-2 px-3 text-gray-400 transition-all hover:text-gray-700"
          data-testid="create-wallet"
        >
          <IoAddCircleOutline className="text-4xl" />
          <p className="text-sm font-semibold uppercase">Create Smart Account</p>
        </Link>
        {accounts?.map((smartAccount, i) => (
          <SmartAccountCard key={`card-${smartAccount.address}`} smartAccount={smartAccount} />
        ))}
        {/* <div className="grid h-full w-full grid-cols-1 gap-4 rounded-md bg-white p-4 shadow sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:px-8 xl:py-14"></div> */}
        {/* {isLoading ? (
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-md bg-white p-4 shadow">
            <Spinner size="md" />
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-1 gap-4 rounded-md bg-white p-4 shadow sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:px-8 xl:py-14">
            <Link
              href="/accounts/create"
              passHref={true}
              className="hover:bg-mirage-100/30 mx-auto flex h-[12rem] w-full max-w-[24rem] flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 py-2 px-3 text-gray-400 transition-all hover:text-gray-700"
              data-testid="create-wallet"
            >
              <IoAddCircleOutline className="text-4xl" />
              <p className="text-sm font-semibold uppercase">Create Smart Account</p>
            </Link>
            {accounts?.map((smartAccount, i) => (
              <SmartAccountCard key={`card-${smartAccount.address}`} smartAccount={smartAccount} />
            ))}
          </div>
        )} */}
      </div>
    </>
  );
};

export default ListWallets;
