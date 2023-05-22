import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { VectisLogo } from '@vectis/components';

import ButtonConnectWallet from './Layout/ButtonConnectWallet';
import Hamburguer from './Layout/Hamburguer';

interface Props {
  isSidebarOpen: boolean;
  sideBarToggle: () => void;
  isProtected: boolean;
}

const Heading: React.FC<Props> = ({ isSidebarOpen, sideBarToggle, isProtected }) => {
  return (
    <div className="sticky top-0 z-[60] flex h-[4.5rem] w-full items-center justify-between border-b border-gray-200 bg-white px-4 ">
      <Link href="/">
        <VectisLogo className="h-[24px] w-[100px] fill-kashmir-blue-500" />
      </Link>
      <div className={clsx('gap-4 ', !isProtected ? 'flex' : 'hidden md:flex')}>
        <ButtonConnectWallet />
      </div>

      {isProtected && (
        <div className="flex md:hidden">
          <Hamburguer isOpen={isSidebarOpen} toggle={sideBarToggle} />
        </div>
      )}
    </div>
  );
};

export default Heading;
