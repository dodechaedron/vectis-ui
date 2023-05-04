import React from 'react';
import { useRouter } from 'next/router';
import { useVectis } from 'providers';
import { headingLink } from 'utils/links';

import { IntlAddress } from '~/services/browser';

import ChainSelector from './ChainSelector';

import { AiOutlineLogout } from 'react-icons/ai';

const Heading: React.FC = () => {
  const { pathname } = useRouter();
  const { userAddr, disconnect } = useVectis();
  const link = headingLink.find((link) => link.href === pathname);

  if (!userAddr) return null;

  if (pathname === '/404') return null;

  return (
    <div className="flex h-[4.5rem] items-center justify-between border-b border-gray-200 bg-white px-4 ">
      <h2 className="text-2xl font-bold leading-6 text-gray-900">{link?.text || ''}</h2>
      <div className="flex gap-4">
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
    </div>
  );
};

export default Heading;
