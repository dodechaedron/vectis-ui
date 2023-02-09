import Head from "next/head";

import Transactions from "~/components/Transactions";

import type { NextPage } from "next";

const Guardian: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Transactions</title>
      </Head>

      <div className="flex flex-col flex-1 h-full">
        <Transactions filter pagination />
      </div>
    </>
  );
};

export default Guardian;
