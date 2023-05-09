import Head from 'next/head';

import { useVectis } from '~/providers';

import { Button } from '~/components/Buttons';
import ConnectWallet from '~/components/ConnectWallet';

import ListWallets from './accounts';

import type { NextPage } from 'next';

const WelcomePage: NextPage = () => {
  const { userAddr } = useVectis();
  return (
    <>
      <Head>
        <title>Vectis | Welcome</title>
      </Head>
      <div className="grid h-full w-full grid-cols-4 gap-4">
        <div className="col-span-1 flex h-full w-full flex-1 flex-col gap-4 rounded-md bg-white p-4">
          {userAddr ? <ListWallets /> : <ConnectWallet />}
        </div>
        <div className="col-span-3 flex h-full w-full flex-1 flex-col items-start justify-center rounded-md bg-gradient-to-br from-kashmir-blue-100 via-kashmir-blue-500/50 to-kashmir-blue-500 p-10">
          <h2 className="text-4xl font-semibold  text-white">Welcome to Vectis</h2>
          <p className="text-lg text-white">Vectis is a smart account management tool for Solana.</p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2">
            <div className="flex w-full flex-col items-start justify-center gap-4 rounded-md bg-white p-8">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold">Create Vectis Account</h3>
                <p className="text-sm text-gray-500">Create a smart account to manage your tokens.</p>
              </div>
              <Button>Create Account</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
