import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';

import { Anek_Latin } from '@next/font/google';

import { useApp } from '~/providers';

import Heading from '~/components/Heading';

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

  const { account } = useApp();
  const { pathname } = useRouter();

  const shouldShowSidebar = useMemo(() => '/' !== pathname, [pathname]);
  const sideBarToggle = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  if (pathname !== '/' && !account) return <Loading />;

  return (
    <div className={clsx('bg-gray-100 text-gray-900', font.className)}>
      <Heading isSidebarOpen={isSidebarOpen} sideBarToggle={sideBarToggle} />
      <main className="max-w-screen flex flex-1">
        {shouldShowSidebar ? <Sidebar visible={isSidebarOpen} setVisible={sideBarToggle} /> : null}
        <div className="flex w-full flex-1 gap-4">{children}</div>
      </main>
      <GlobalSidebar />
      <GlobalModal />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Layout;
