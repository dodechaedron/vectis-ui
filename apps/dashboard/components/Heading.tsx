import React from 'react';
import { useVectis } from 'providers';
import Link from 'next/link';

import { VectisLogo } from '@vectis/components';

import { IntlAddress } from '~/services/browser';

import Hamburguer from './Layout/Hamburguer';

import { AiOutlineLogout } from 'react-icons/ai';

interface Props {
  isSidebarOpen: boolean;
  sideBarToggle: () => void;
}

const Heading: React.FC<Props> = ({ isSidebarOpen, sideBarToggle }) => {
  const { username, disconnect } = useVectis();

  return (
    <div className="sticky top-0 z-[60] flex h-[4.5rem] w-full items-center justify-between border-b border-gray-200 bg-white px-4 ">
      <Link href="/dashboard">
        <VectisLogo className="h-[24px] w-[100px] fill-kashmir-blue-500" />
      </Link>
      <div className="hidden gap-4 md:flex">
        {username ? (
          <div className="flex cursor-pointer items-center justify-center gap-2" onClick={disconnect}>
            <AiOutlineLogout className="h-6 w-6 text-kashmir-blue-500" />
            <div className="flex flex-col">
              <p className="mb-[-4px] text-[8px] text-gray-400">connected</p>
              <p className="text-sm capitalize">{username}</p>
            </div>
          </div>
        ) : (
          <>
            {/* <button className="block w-full rounded-md border border-transparent bg-kashmir-blue-500 py-3 px-5 text-center text-base font-medium text-white shadow-md hover:bg-kashmir-blue-600  sm:inline-block sm:w-auto">
            Connect Wallet
          </button> */}
          </>
        )}
        <p className="mt-2 max-w-4xl text-xs text-gray-500"></p>
      </div>

      <div className="flex md:hidden">
        <Hamburguer isOpen={isSidebarOpen} toggle={sideBarToggle} />
      </div>
    </div>
  );
};

export default Heading;
