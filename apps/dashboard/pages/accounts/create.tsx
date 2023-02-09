import WalletCreationWizard from "components/WalletCreationWizard";
import Head from "next/head";

import type { NextPage } from "next";

const CreateWallet: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vectis | Create Wallet</title>
      </Head>
      <WalletCreationWizard />
    </>
  );
};

export default CreateWallet;
