import React from 'react';
import { useVectis } from 'providers';
import { useFormContext } from 'react-hook-form';

import { Button } from '../Buttons';

import { UserIcon } from '@heroicons/react/20/solid';
import { RiErrorWarningFill } from 'react-icons/ri';

interface Props {
  goBack: () => void;
  goNext: () => void;
}

const StepPreview: React.FC<Props> = ({ goBack, goNext }) => {
  const { defaultFee } = useVectis();
  const { getValues, formState } = useFormContext();
  const { isSubmitting } = formState;
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
              <p className="text-sm font-medium text-gray-900">Guardians</p>
              {guardians.length ? (
                <div className="col-span-3 mt-0 text-sm text-gray-900">
                  <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    {guardians.map((guardian) => {
                      return (
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm" key={guardian.address}>
                          <div className="flex w-0 flex-1 items-center">
                            <UserIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 w-0 flex-1 truncate">{guardian.address}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <div className="col-span-3 mt-0 rounded-md bg-kashmir-blue-100 p-2 text-sm">
                  <div className="flex items-center gap-2">
                    <RiErrorWarningFill className="h-4 w-4" />
                    <p>
                      No guardians are define, remember you could define them later.{' '}
                      <span className="font-bold">{"Keep in mind you can't recovery your account in this scenario."}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </dl>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <Button type="submit" className="mt-5" disabled={isSubmitting}>
          Create Wallet
        </Button>

        <Button onClick={goBack} className="mt-5" disabled={isSubmitting}>
          Back
        </Button>
      </div>
    </>
  );
};

export default StepPreview;
