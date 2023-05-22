import WalletCreationWizard from 'components/WalletCreationWizard';
import Head from 'next/head';

import { useVectis } from '~/providers';

import { Button } from '~/components/Buttons';

import type { NextPage } from 'next';

const CreateWallet: NextPage = () => {
  const { userAddr, connect } = useVectis();
  return (
    <>
      <Head>
        <title>Vectis | Create Wallet</title>
      </Head>
      <div className="flex h-[calc(100vh-72px)] w-full flex-1 items-center">
        {userAddr ? null : (
          <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <Button onClick={connect}>Connect Wallet</Button>
          </div>
        )}
        <WalletCreationWizard />
      </div>
    </>
  );
};

export default CreateWallet;
