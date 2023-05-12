import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useVectis } from 'providers';
import { useFormContext } from 'react-hook-form';

import { Button } from '../Buttons';

import { UserIcon } from '@heroicons/react/20/solid';

interface Props {
  goBack: () => void;
  goNext: () => void;
}

const StepPreview: React.FC<Props> = ({ goBack, goNext }) => {
  const { defaultFee } = useVectis();
  const { getValues, formState } = useFormContext();
  const { isSubmitting, isSubmitSuccessful } = formState;
  const { guardians, initialFunds, label, multisig, threshold } = getValues();

  return (
    <>
      <div className="mt-5  min-h-[35rem] overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="py-5 px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Preview of your information for next account</p>
        </div>
        <div className="border-t border-gray-200 p-0">
          <dl className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 gap-4 py-4 px-6">
              <p className="text-sm font-medium text-gray-900">
                Account Name: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{label}</span>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 px-6">
              <p className="text-sm font-medium text-gray-900">
                Initial Funds:{' '}
                <span className="col-span-2 mt-0 text-sm text-gray-500">
                  {initialFunds || 0} {defaultFee.symbol}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 px-6">
              <p className="text-sm font-medium text-gray-900">
                Multisig: <span className="col-span-1 mt-0 text-sm text-gray-500">{multisig ? 'Yes' : 'No'}</span>
              </p>
              {multisig && (
                <p className="text-sm font-medium text-gray-900">
                  Threshold: <span className="col-span-1 mt-0 text-sm text-gray-500">{threshold}</span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 px-6">
              <dt className="text-sm font-medium text-gray-900">Guardians</dt>
              <dd className="col-span-3 mt-0 text-sm text-gray-900">
                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                  {guardians.map((guardian) => {
                    return (
                      <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm" key={guardian.value}>
                        <div className="flex w-0 flex-1 items-center">
                          <UserIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 w-0 flex-1 truncate">{guardian.value}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between">
        {isSubmitSuccessful ? null : (
          <Button type="submit" className="mt-5" disabled={isSubmitting}>
            Create Wallet
          </Button>
        )}
        {isSubmitSuccessful ? null : (
          <Button onClick={goBack} className="mt-5" disabled={isSubmitting}>
            Back
          </Button>
        )}
      </div>
    </>
  );
};

export default StepPreview;
