import React from 'react';

import { useChain } from '@cosmos-kit/react-lite';

import { chains } from '~/configs/chains';

import { HiOutlineWallet } from 'react-icons/hi2';

interface Props {
  chainName: string;
}

const SuccessConnect: React.FC<Props> = ({ chainName }) => {
  const { username, isWalletConnected } = useChain(chainName);

  if (!isWalletConnected) return null;

  return (
    <>
      <p className="text-center font-bold">Account Connected</p>
      <div className="group flex items-center justify-between gap-4 rounded-lg bg-gray-200 p-2 ">
        <div className="flex items-center justify-between gap-2">
          <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
            <HiOutlineWallet className="h-6 w-6 stroke-kashmir-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="capi font-bold capitalize">{username}</p>
            <p className="text-xs">{chains.map((c) => c.pretty_name).join(' | ')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessConnect;
