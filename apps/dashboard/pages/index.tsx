import Head from 'next/head';
import Link from 'next/link';

import { Button } from '~/components/Buttons';
import DrawerAccounts from '~/components/DrawerAccounts';

import type { NextPage } from 'next';

const WelcomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Welcome</title>
      </Head>
      <div className="flex w-full flex-col items-center gap-4 p-4 lg:h-[calc(100vh-72px)] lg:flex-row">
        <div className="relative flex h-full w-full flex-1 flex-col gap-4 lg:max-w-[25rem]">
          <DrawerAccounts canCollapse={true} />
        </div>
        <div className="relative h-full w-full flex-1 rounded-md bg-gradient-to-tl from-kashmir-blue-100 via-[#7493d1] to-[#0e1d40]">
          <div className="flex h-full w-full flex-col items-start justify-center rounded-md bg-kashmir-blue-700/30 p-10">
            <h2 className="text-4xl font-semibold  text-white">Welcome to Vectis</h2>
            <p className="text-lg text-white">Vectis is a smart account management tool for Cosmos.</p>
            <div className="mt-8 flex w-full flex-col justify-evenly gap-4 lg:flex-row xl:justify-start xl:gap-16">
              <div className="flex w-full max-w-[27.5rem] flex-col items-start justify-center gap-4 rounded-md bg-white p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-semibold">Vectis Account</h3>
                  <p className="text-sm text-gray-500">Create a smart account account account to manage your tokens.</p>
                </div>
                <Button as={Link} href="/create">
                  Create Account
                </Button>
              </div>
              <div className="flex w-full max-w-[27.5rem] flex-col items-start justify-center gap-4 rounded-md bg-white p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-semibold">Guardian Explorer</h3>
                  <p className="text-sm text-gray-500">See accounts where you are guardian of and do guardian actions.</p>
                </div>
                <Button as={Link} href="/guardians">
                  Explore Accounts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
