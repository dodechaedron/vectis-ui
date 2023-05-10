import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useVectis } from '~/providers';

import HeadingTabs from '~/components/HeadingTabs';
import SettingsAccount from '~/components/SettingsAccount';
import SettingsBuilderMsg from '~/components/SettingsBuilderMsg';
import SettingsGuardians from '~/components/SettingsGuardians';

import type { NextPage } from 'next';

const SettingsPage: NextPage = () => {
  const { userAddr, account } = useVectis();
  const { push: goToPage } = useRouter();

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

  useEffect(() => {
    if (account) {
      account.controllerAddr != userAddr && goToPage('/accounts');
    }
  }, [account]);

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
