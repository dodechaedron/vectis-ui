import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import InputArray from './Inputs/InputArray';
import InputRange from './Inputs/InputRange';
import InputSwitch from './Inputs/InputSwitch';
import { Button } from './Buttons';
import Divider from './Divider';
import GuardianRequestCard from './GuardianRequestCard';
import ShowGuardian from './ShowGuardian';

type FormValues = {
  guardians: { address: string }[];
  multisig: boolean;
  threshold: number;
};

const resolver = (userAddr: string, bech32Prefix: string) =>
  yupResolver(
    yup
      .object()
      .shape({
        guardians: yup.array().of(
          yup.object().shape({
            address: yup
              .string()
              .matches(new RegExp(`^(${bech32Prefix})[0-9a-zA-Z]{39}`, 'g'), 'Guardian address does not seem to be valid')
              .not([userAddr], 'Guardian address cannot be the same as the user address')
          })
        ),
        threshold: yup.number(),
        multisig: yup.boolean()
      })
      .required()
  );

const SettingsGuardians: React.FC = () => {
  const queryClient = useQueryClient();
  const { vectis, account, userAddr, chain } = useVectis();
  const { toast } = useToast();
  const { control, setValue, watch, handleSubmit, formState } = useForm<FormValues>({
    resolver: resolver(userAddr, chain.bech32_prefix),
    mode: 'onChange',
    defaultValues: { guardians: [{ address: '' }], threshold: 1 }
  });
  const { errors } = formState;

  const guardianErrors = useMemo(() => errors?.guardians?.map?.((e) => e?.address?.message), [formState]);

  const { mutateAsync: requestGuardianRotation } = useMutation({
    mutationFn: async (data: FormValues) =>
      await toast.promise(
        vectis.proxyRequestUpdateGuardians(
          account.address,
          data.guardians.map((g) => g.address),
          data.multisig ? data.threshold : 0
        )
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['guardian_proposal_request'], type: 'all' });
    }
  });

  const multisig = watch('multisig');
  const guardians = watch('guardians');
  const threshold = watch('threshold');

  return (
    <div className="flex h-full w-full flex-col gap-4 2xl:flex-row">
      <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit((v) => requestGuardianRotation(v))}>
        <div className="flex-2 flex min-h-[28rem] w-full flex-col rounded-md bg-white py-4 px-4 shadow-sm md:px-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Guardian List</h3>
          <p className="mt-1 mb-4 text-sm text-gray-500">This is the list of the guardians who could recover your account.</p>
          <ShowGuardian guardians={account.guardians} />

          <Divider label="Create Request" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Guardians</h3>
              <p className="mt-1 text-sm text-gray-500">Keep in mind that all guardians will be replaced</p>
              <InputArray control={control} name="guardians" errors={guardianErrors} />
              {errors.guardians && <p className="text-sm text-red-500">{errors.guardians.message}</p>}
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
                    max={guardians.length}
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
