import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';

import { Anek_Latin } from '@next/font/google';

import { protectedRoutes } from '~/utils/links';

import Heading from '~/components/Heading';

import GlobalModal from '../Modals/GlobalModal';

import AccountSidebar from './AccountsSidebar';
import Sidebar from './Sidebar';

const font = Anek_Latin({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [drawerAccountsOpen, setDrawerAccountsOpen] = React.useState(false);

  const { pathname } = useRouter();

  const shouldShowSidebar = useMemo(() => protectedRoutes.includes(pathname), [pathname]);
  const sideBarToggle = useCallback(() => {
    drawerAccountsOpen ? setDrawerAccountsOpen(false) : setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className={clsx('bg-gray-100 text-gray-900', font.className)}>
      <Heading isSidebarOpen={isSidebarOpen} sideBarToggle={sideBarToggle} />
      <main className="max-w-screen flex flex-1">
        {shouldShowSidebar ? (
          <>
            <Sidebar visible={isSidebarOpen} setVisible={sideBarToggle} seeAccounts={() => setDrawerAccountsOpen(true)} />
            <AccountSidebar isOpen={drawerAccountsOpen} close={() => setDrawerAccountsOpen(false)} />
          </>
        ) : null}
        <div className="flex w-full flex-1 gap-4">{children}</div>
      </main>
      <GlobalModal />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Layout;
