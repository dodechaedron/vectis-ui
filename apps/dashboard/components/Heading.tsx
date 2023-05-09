import React from 'react';
import { useRouter } from 'next/router';
import { useVectis } from 'providers';
import { headingLink } from 'utils/links';
import Link from 'next/link';

import { VectisLogo } from '@vectis/components';

import { IntlAddress } from '~/services/browser';

import Hamburguer from './Layout/Hamburguer';
import ChainSelector from './ChainSelector';

import { AiOutlineLogout } from 'react-icons/ai';

interface Props {
  isSidebarOpen: boolean;
  sideBarToggle: () => void;
}

const Heading: React.FC<Props> = ({ isSidebarOpen, sideBarToggle }) => {
  const { userAddr, disconnect } = useVectis();

  return (
    <div className="sticky top-0 z-50 flex h-[4.5rem] w-full items-center justify-between border-b border-gray-200 bg-white px-4 ">
      <Link href="/dashboard">
        <VectisLogo className="h-[24px] w-[100px] fill-kashmir-blue-500" />
      </Link>
      <div className="hidden gap-4 md:flex">
        {userAddr ? (
          <div className="flex cursor-pointer items-center justify-center gap-2" onClick={disconnect}>
            <AiOutlineLogout className="h-6 w-6 text-kashmir-blue-500" />
            <div className="flex flex-col">
              <p className="mb-[-4px] text-[8px] text-gray-400">connected</p>
              <p className="text-sm">{IntlAddress(userAddr, 8)}</p>
            </div>
          </div>
        ) : (
          <>
            {/* <button className="block w-full rounded-md border border-transparent bg-kashmir-blue-500 py-3 px-5 text-center text-base font-medium text-white shadow-md hover:bg-kashmir-blue-600  sm:inline-block sm:w-auto">
            Connect Wallet
          </button> */}
          </>
        )}
        <ChainSelector />
        <p className="mt-2 max-w-4xl text-xs text-gray-500"></p>
      </div>

      <div className="flex md:hidden">
        <Hamburguer isOpen={isSidebarOpen} toggle={sideBarToggle} />
      </div>
    </div>
  );
};

export default Heading;
