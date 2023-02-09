import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useVectis } from '~/providers';

import HeadingTabs from '~/components/HeadingTabs';
import SettingsAccount from '~/components/SettingsAccount';
import SettingsBuilderMsg from '~/components/SettingsBuilderMsg';
import SettingsGuardians from '~/components/SettingsGuardians';

import type { NextPage } from 'next';
import { WalletInfo } from '@vectis/types/Proxy.types';

const ManageWallet: NextPage = () => {
  const { userAddr, signingClient } = useVectis();
  const { push: goToPage, query } = useRouter();

  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  const tabs = useMemo(
    () => [
      { name: 'Account', component: SettingsAccount, props: { walletInfo }, disabled: false },
      { name: 'Guardians', component: SettingsGuardians, props: { walletInfo }, disabled: false },
      { name: 'Execute Message', component: SettingsBuilderMsg, disabled: false },
      { name: 'Relayers', component: SettingsAccount, disabled: true },
      { name: 'Plugins', component: SettingsAccount, disabled: true },
      { name: 'Spending Limits', component: SettingsAccount, disabled: true },
      { name: 'Migrate', component: SettingsAccount, disabled: true }
    ],
    [walletInfo]
  );

  useEffect(() => {
    if (!query.address) return;
    const fetchWalletInfo = async () => {
      const walletInfo = await signingClient.getWalletInfo(query.address as string);
      if (!walletInfo || walletInfo.controller_addr != userAddr) {
        goToPage('/accounts');
      }
      setWalletInfo(walletInfo);
    };
    fetchWalletInfo();
  }, [query]);

  return (
    <>
      <Head>
        <title>Vectis | Manage Wallet</title>
      </Head>
      <HeadingTabs tabs={tabs} defaultTab="Account" />
    </>
  );
};

export default ManageWallet;
