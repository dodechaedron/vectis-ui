import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Heading from 'components/Heading';
import { useVectis } from 'providers';

import { Anek_Latin } from '@next/font/google';

import ConnectWallet from '../ConnectWallet';
import Loading from '../Loading';
import GlobalModal from '../Modals/GlobalModal';
import GlobalSidebar from '../Sidebars/GlobalSidebar';

import Sidebar from './Sidebar';

const font = Anek_Latin({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const { userAddr, queryClient, account } = useVectis();
  const { pathname } = useRouter();

  const shouldShowSidebar = useMemo(() => '/' !== pathname, [pathname]);
  const sideBarToggle = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

  if (!queryClient) return <Loading />;
  if (!account && pathname !== '/accounts') return <Loading />;
  const Component = userAddr ? children : <ConnectWallet />;

  return (
    <div className={clsx('flex h-screen w-full flex-1 flex-col bg-gray-100 text-gray-900', font.className)}>
      <Heading isSidebarOpen={isSidebarOpen} sideBarToggle={sideBarToggle} />
      <GlobalSidebar />
      <main className="max-w-screen flex h-full w-full flex-1">
        {shouldShowSidebar ? <Sidebar visible={isSidebarOpen} setVisible={sideBarToggle} /> : null}
        <div className="flex min-h-full w-full flex-1 gap-4 p-4">{Component}</div>
      </main>
      <GlobalModal />
    </div>
  );
};

export default Layout;
