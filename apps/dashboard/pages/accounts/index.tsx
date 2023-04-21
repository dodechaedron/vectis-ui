import { useQuery } from 'react-query';
import Head from 'next/head';
import Link from 'next/link';

import { encodeSecp256k1Pubkey } from '@cosmjs/amino';

import { useTranslations, useVectis } from '~/providers';

import SmartAccountCard from '~/components/SmartAccountCard';

import { IoAddCircleOutline } from 'react-icons/io5';

import type { NextPage } from 'next';

const ListWallets: NextPage = () => {
  const { t } = useTranslations();
  const { signingClient, keyDetails } = useVectis();
  const { isLoading, data: accounts } = useQuery('vectis_accounts', () =>
    signingClient.getAccountsByPubkey(encodeSecp256k1Pubkey((keyDetails as any).pubkey! || keyDetails.pubKey).value)
  );

  return (
    <>
      <Head>
        <title>Vectis | Wallets</title>
      </Head>

      <div className="flex h-full flex-col">
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
      </div>
    </>
  );
};

export default ListWallets;
