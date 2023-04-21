import Link from 'next/link';

import Address from './Address';

import { ChevronRightIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/solid';

import { VectisAccount } from '~/interfaces';

interface Props {
  accountList: VectisAccount[];
}

const GuardianWalletList: React.FC<Props> = ({ accountList }) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {accountList.map((acc) => (
        <li key={acc.address}>
          <Link href={`/guardians/${acc.address}`} className="block hover:bg-gray-50">
            <div className="flex items-center justify-center px-4 py-4 sm:px-6">
              <div className="flex w-full flex-col items-start pr-4">
                <div className="flex w-full items-center justify-between">
                  <p className="truncate text-sm font-medium text-kashmir-blue-500">{acc.label}</p>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-kashmir-blue-100 px-2 text-xs font-semibold leading-5 text-kashmir-blue-800">
                      {acc.multisigAddress ? 'Multisig' : 'Single'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 w-full sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <CubeTransparentIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <Address address={acc.address} />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <UserGroupIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <p>Guardians: {acc.guardians.length}</p>
                  </div>
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GuardianWalletList;
