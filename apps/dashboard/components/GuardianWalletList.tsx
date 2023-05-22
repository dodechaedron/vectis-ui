import Link from 'next/link';

import { IntlAddress } from '~/services/browser';

import { ChevronRightIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/solid';

import { VectisAccount } from '~/interfaces';

interface Props {
  accountList: VectisAccount[];
  onClickAccount?: (account: VectisAccount) => void;
}

const GuardianWalletList: React.FC<Props> = ({ accountList, onClickAccount }) => {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 py-5 px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Accounts</h3>
        <p className="mt-1 text-sm text-gray-500">Preview of accounts you are guardian</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {accountList.map((acc) => (
          <li key={acc.address} onClick={() => onClickAccount?.(acc)} className="cursor-pointer hover:bg-gray-50">
            <div className="flex w-full items-center justify-between px-6 py-4">
              <div className="flex flex-col gap-2">
                <p className="truncate text-sm font-bold capitalize text-kashmir-blue-500">{acc.label}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <CubeTransparentIcon
                    className="mr-1.5 h-8 w-8 flex-shrink-0 rounded-full bg-gray-100 p-1 text-kashmir-blue-400"
                    aria-hidden="true"
                  />
                  <p>{IntlAddress(acc.address)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col justify-center gap-2">
                  <p className=" rounded-full bg-kashmir-blue-100 px-2 text-center text-xs font-semibold leading-5 text-kashmir-blue-800">
                    {acc.multisigAddress ? 'Multisig' : 'Single'}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <p>Guardians: {acc.guardians.length}</p>
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuardianWalletList;
