import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Heading from 'components/Heading';
import { useVectis } from 'providers';

import { Anek_Latin } from '@next/font/google';

import ConnectWallet from '../ConnectWallet';
import Loading from '../Loading';
import GlobalModal from '../Modals/GlobalModal';

import Sidebar from './Sidebar';

const font = Anek_Latin({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { isReady, account, userAddr } = useVectis();
  const { push: goToPage, pathname } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (account?.controller_addr !== userAddr && pathname === '/') goToPage('/accounts');
  }, [pathname, isReady]);

  if (!isReady) return <Loading />;
  const Component = userAddr ? children : <ConnectWallet />;

  return (
    <div className={clsx('flex flex-col bg-gray-100 text-gray-900 md:flex-row w-full h-full', font.className)}>
      <Sidebar />

      <main className="flex w-full flex-1 flex-col">
        <Heading />
        <div className="flex h-full flex-1 flex-col gap-4 p-4">{Component}</div>
      </main>
      <GlobalModal />
    </div>
  );
};

export default Layout;
