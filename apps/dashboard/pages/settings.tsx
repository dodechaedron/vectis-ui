import { useMemo } from 'react';
import Head from 'next/head';

import { useVectis } from '~/providers';

import HeadingTabs from '~/components/HeadingTabs';
import SettingsAccount from '~/components/SettingsAccount';
import SettingsBuilderMsg from '~/components/SettingsBuilderMsg';
import SettingsGuardians from '~/components/SettingsGuardians';

import type { NextPage } from 'next';

const SettingsPage: NextPage = () => {
  const { account } = useVectis();

  const tabs = useMemo(
    () => [
      { name: 'Account', component: SettingsAccount, props: { walletInfo: account }, disabled: false },
      { name: 'Guardians', component: SettingsGuardians, props: { walletInfo: account }, disabled: false },
      { name: 'Message Builder', component: SettingsBuilderMsg, disabled: false },
      /* { name: 'Relayers', component: SettingsAccount, disabled: true }, */
      { name: 'Plugins', component: () => null, disabled: true },
      { name: 'Spending Limits', component: () => null, disabled: true },
      { name: 'Migrate', component: () => null, disabled: true }
    ],
    [account]
  );

  return (
    <>
      <Head>
        <title>Vectis | Manage Wallet</title>
      </Head>

      <HeadingTabs tabs={tabs} defaultTab="Account" />
    </>
  );
};

export default SettingsPage;
