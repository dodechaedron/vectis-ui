import React from 'react';

import Address from './Address';

import { VectisAccount } from '~/interfaces';

interface Props {
  accountInfo: VectisAccount;
}

const GuardianAccountInfo: React.FC<Props> = ({ accountInfo }) => {
  return (
    <div className="flex max-h-[22rem] flex-col rounded-md bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Smart Account</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Useful information for guardianship</p>
      </div>
      <div className="divide-y divide-gray-200">
        <p className="py-4 px-6 text-sm font-medium text-gray-900">
          Account Name: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{accountInfo.label}</span>
        </p>
        <div className="py-4 px-6 text-sm font-medium text-gray-900">
          Account Address: <Address className="text-gray-500" address={accountInfo.address} />
        </div>
        <p className="py-4 px-6 text-sm font-medium text-gray-900">
          Status: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{accountInfo.frozen ? 'Frozen' : 'Active'}</span>
        </p>
        <div className="grid grid-cols-3 gap-4 py-4 px-6">
          <p className="text-sm font-medium text-gray-900">
            Multisig: <span className="col-span-1 mt-0 text-sm text-gray-500">{accountInfo.multisigAddress ? 'Yes' : 'No'}</span>
          </p>
          {accountInfo.threshold.weight ? (
            <p className="text-sm font-medium text-gray-900">
              Threshold:{' '}
              <span className="col-span-1 mt-0 text-sm text-gray-500">
                {accountInfo.threshold.weight} of {accountInfo.threshold.totalWeight}
              </span>
            </p>
          ) : null}
          {accountInfo.multisigAddress ? (
            <div className="text-sm font-medium text-gray-900">
              Multisig Address: <Address className="text-gray-500" address={accountInfo.multisigAddress} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GuardianAccountInfo;
