import React, { useCallback, useMemo, useState } from 'react';
import ProgressWizard from 'components/Forms/ProgressWizard';
import { useToast } from 'hooks';
import { useVectis } from 'providers';
import { FormProvider, useForm } from 'react-hook-form';
import { sleep } from 'utils/misc';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { convertDenomToMicroDenom, convertMicroDenomToDenom } from '~/utils/conversion';

import StepAccountDetails from './StepAccountDetails';
import StepGuardianSelection from './StepGuardianSelection';
import StepPreview from './StepPreview';
import StepSuccess from './StepSuccess';

import { VectisAccount } from '~/interfaces';

const steps = [
  { id: 1, name: 'Account Details', Component: StepAccountDetails },
  { id: 2, name: 'Choose Guardians', Component: StepGuardianSelection },
  { id: 3, name: 'Preview', Component: StepPreview },
  { id: 4, name: 'Success', Component: StepSuccess }
];

export type WalletCreationForm = {
  initialFunds: number;
  label: string;
  guardians: { address: string }[];
  multisig: boolean;
  threshold: number;
};

const resolver = (userAddr: string, bech32Prefix: string, maxAmount: number) =>
  yupResolver(
    yup
      .object()
      .shape({
        label: yup.string().required('Account name is required'),
        initialFunds: yup
          .number()
          .min(0, 'Initial funds must be greater than 0')
          .max(maxAmount, `Initial funds must be less than ${maxAmount}`)
          .required(),
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

const WalletCreationWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [smartAccount, setSmartAccount] = useState<VectisAccount>();

  const { toast } = useToast();
  const { vectis, defaultFee, chain, userAddr } = useVectis();

  const { data: balance } = useQuery(['balance', userAddr, vectis], () => vectis?.getBalance(userAddr, defaultFee.udenom), {
    initialData: { amount: '0', denom: defaultFee.udenom }
  });

  const queryClient = useQueryClient();
  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: async (inputsValue: WalletCreationForm) => {
      const guardians = inputsValue.guardians.map((g) => g.address).filter(Boolean);
      const relayers = [];
      const initialFunds = convertDenomToMicroDenom(inputsValue.initialFunds, defaultFee.exponent);
      const promise = async () => {
        await vectis.createProxyWallet(
          inputsValue.label,
          guardians,
          relayers,
          inputsValue.multisig,
          Number(initialFunds),
          inputsValue.threshold
        );
        const accounts = await vectis.getAccounts([userAddr]);
        setSmartAccount(accounts[accounts.length - 1]);
        goNext();
      };
      return await toast.promise(promise());
    },
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['vectis_accounts'], type: 'all' })
  });

  const methods = useForm<WalletCreationForm>({
    defaultValues: { guardians: [{ address: '' }], initialFunds: 0 },
    resolver: resolver(userAddr, chain.bech32_prefix, convertMicroDenomToDenom(balance.amount, defaultFee.exponent)),
    mode: 'onChange'
  });
  const { handleSubmit } = methods;

  const { Component } = useMemo(
    () => steps.find((s) => s.id === step) as { Component: React.FC<{ goBack: () => void; goNext: () => void; smartAccount?: VectisAccount }> },
    [step]
  );

  const goNext = useCallback(() => setStep(step + 1), [step]);
  const goBack = useCallback(() => setStep(step - 1), [step]);

  return (
    <form className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit((v) => onSubmit(v))}>
      <ProgressWizard steps={steps} currentStep={step - 1} changeStep={setStep} />
      <FormProvider {...methods}>{Component && <Component goBack={goBack} goNext={goNext} smartAccount={smartAccount} />}</FormProvider>
    </form>
  );
};

export default WalletCreationWizard;
