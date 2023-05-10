import Head from 'next/head';

import Transactions from '~/components/Transactions';

import type { NextPage } from 'next';

const Guardian: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Transactions</title>
      </Head>

      <div className="flex h-full flex-1 flex-col p-4">
        <Transactions filter pagination />
      </div>
    </>
  );
};

export default Guardian;
