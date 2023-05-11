import { useMemo } from 'react';
import Head from 'next/head';

import { useAccount } from '~/hooks/useAccount';

import HeadingTabs from '~/components/HeadingTabs';
import SettingsAccount from '~/components/SettingsAccount';
import SettingsBuilderMsg from '~/components/SettingsBuilderMsg';
import SettingsGuardians from '~/components/SettingsGuardians';
import Spinner from '~/components/Spinner';

import type { NextPage } from 'next';

const SettingsPage: NextPage = () => {
  const { account, isLoading } = useAccount();

  const tabs = useMemo(
    () => [
      { name: 'Account', component: SettingsAccount, props: { walletInfo: account }, disabled: false },
      { name: 'Guardians', component: SettingsGuardians, props: { walletInfo: account }, disabled: false },
      { name: 'Execute Message', component: SettingsBuilderMsg, disabled: false },
      /* { name: 'Relayers', component: SettingsAccount, disabled: true }, */
      { name: 'Plugins', component: SettingsAccount, disabled: true },
      { name: 'Spending Limits', component: SettingsAccount, disabled: true },
      { name: 'Migrate', component: SettingsAccount, disabled: true }
    ],
    [account]
  );

  return (
    <>
      <Head>
        <title>Vectis | Manage Wallet</title>
      </Head>

      {isLoading ? <Spinner /> : <HeadingTabs tabs={tabs} defaultTab="Account" />}
    </>
  );
};

export default SettingsPage;
