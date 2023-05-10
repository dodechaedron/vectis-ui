import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import InputArray from './Inputs/InputArray';
import InputRange from './Inputs/InputRange';
import InputSwitch from './Inputs/InputSwitch';
import { Button } from './Buttons';
import Divider from './Divider';
import GuardianRequestCard from './GuardianRequestCard';
import ShowGuardian from './ShowGuardian';

import { WalletInfo } from '@vectis/types/Proxy.types';

type FormValues = {
  guardians: { value: string }[];
  multisig: boolean;
  threshold: number;
};

interface Props {
  walletInfo: WalletInfo;
}

const SettingsGuardians: React.FC<Props> = ({ walletInfo }) => {
  const { query } = useRouter();
  const { vectis } = useVectis();
  const { toast } = useToast();
  const { control, setValue, watch, handleSubmit } = useForm<FormValues>({ defaultValues: { guardians: [{}], threshold: 1 } });

  const multisig = watch('multisig');
  const threshold = watch('threshold');

  const onSubmit = async (data) => {
    const promise = vectis.proxyRequestUpdateGuardians(
      query.address as string,
      data.guardians.map((g) => g.value),
      data.multisig ? data.threshold : 0
    );
    await toast.promise(promise, 3000);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 2xl:flex-row">
      <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-2 flex min-h-[28rem] w-full flex-col rounded-md bg-white py-4 px-4 shadow-sm md:px-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Guardian List</h3>
          <p className="mt-1 mb-4 text-sm text-gray-500">This is the list of the guardians who could recover your account.</p>
          <ShowGuardian guardians={walletInfo.guardians} />

          <Divider label="Create Request" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Guardians</h3>
              <p className="mt-1 text-sm text-gray-500">Keep in mind that all guardians will be replaced</p>
              <InputArray control={control} name="guardians" />
            </div>

            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Multisig</h3>
              <p className="mt-1 text-sm text-gray-500">A multisig contract will be instantiated when account is created.</p>
              <div className="mt-5 flex items-center gap-2">
                <InputSwitch value={multisig} onChange={(n) => setValue('multisig', n)} />
                <p className="text-md text-gray-500">Enabling this allows guardians to use a multi-signature contract.</p>
              </div>
              {multisig && (
                <>
                  <p className="text-md my-2 text-gray-500">Please select a threshold for the mulstig</p>
                  <h3 className="text-md font-medium leading-6 text-gray-900">Threshold: {threshold}</h3>
                  <InputRange
                    min={1}
                    max={2}
                    step={1}
                    value={threshold}
                    onChange={(n) => setValue('threshold', n)}
                    className="my-3 max-w-[15rem]"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Create Request</Button>
        </div>
      </form>
      <div className="flex h-full flex-1 flex-col gap-4">
        <GuardianRequestCard />
      </div>
    </div>
  );
};

export default SettingsGuardians;
