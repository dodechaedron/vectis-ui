import React from 'react';

import { useChain } from '@cosmos-kit/react-lite';

import VectisIcon from '~/components/Icons/VectisIcon';
import Spinner from '~/components/Spinner';

interface Props {
  chainName: string;
}

const ConectingWallet: React.FC<Props> = ({ chainName }) => {
  const { isWalletConnecting, wallet } = useChain(chainName);

  if (!isWalletConnecting || !wallet) return null;

  return (
    <>
      <p className="text-center font-bold">Connecting...</p>
      <div className="group flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-200 p-2 hover:bg-kashmir-blue-200">
        <div className="flex items-center justify-between gap-2">
          <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
            {wallet.prettyName.includes('Vectis') ? (
              <VectisIcon className="h-12 w-12 fill-white" />
            ) : (
              <img src={wallet.logo} alt={wallet.prettyName} className="h-6 w-6" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">{wallet.prettyName}</p>
            <p className="text-xs text-gray-500">Browser extension</p>
          </div>
        </div>
        <div className="pr-6">
          <Spinner size="sm" />
        </div>
      </div>
      <div>
        <p>Requesting connection</p>
        <p className="text-sm text-gray-500">Please open & review the {wallet.prettyName} information to connect your wallet.</p>
      </div>
    </>
  );
};

export default ConectingWallet;
