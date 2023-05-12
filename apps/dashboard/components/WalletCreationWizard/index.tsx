import React, { useCallback, useMemo, useState } from 'react';
import ProgressWizard from 'components/Forms/ProgressWizard';
import { useToast } from 'hooks';
import { useVectis } from 'providers';
import { FormProvider, useForm } from 'react-hook-form';
import { sleep } from 'utils/misc';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { convertDenomToMicroDenom } from '~/utils/conversion';

import StepAccountDetails from './StepAccountDetails';
import StepGuardianSelection from './StepGuardianSelection';
import StepPreview from './StepPreview';

const steps = [
  { id: 1, name: 'Choose Guardians', Component: StepGuardianSelection },
  { id: 2, name: 'Account Details', Component: StepAccountDetails },
  { id: 3, name: 'Preview', Component: StepPreview }
];

type FormValues = {
  initialFunds: number;
  label: string;
  guardians: { value: string }[];
  multisig: boolean;
  threshold: number;
};

const resolver = () =>
  yupResolver(
    yup
      .object()
      .shape({
        label: yup.string().required('Account name is required'),
        initialFunds: yup.number(),
        guardians: yup
          .array()
          .of(yup.object().shape({ value: yup.string().required() }))
          .min(1, 'At least one guardian is required')
          .required('Guardians are required'),
        threshold: yup.number(),
        multisig: yup.boolean()
      })
      .required()
  );

const WalletCreationWizard: React.FC = () => {
  const [step, setStep] = useState(1);

  const { toast } = useToast();
  const { vectis, defaultFee } = useVectis();

  const queryClient = useQueryClient();
  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: async (inputsValue: FormValues) => {
      const guardians = inputsValue.guardians.map((g) => g.value);
      const relayers = [];
      const initialFunds = convertDenomToMicroDenom(inputsValue.initialFunds, defaultFee.exponent);
      const promise = vectis.createProxyWallet(
        inputsValue.label,
        guardians,
        relayers,
        inputsValue.multisig,
        Number(initialFunds),
        inputsValue.threshold
      );
      return await toast.promise(promise);
    },
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['vectis_accounts'], type: 'all' })
  });

  const methods = useForm<FormValues>({ defaultValues: { guardians: [{ value: '' }], initialFunds: 0 }, resolver: resolver() });
  const { handleSubmit } = methods;

  const { Component } = useMemo(
    () => steps.find((s) => s.id === step) as { Component: React.FC<{ goBack: () => void; goNext: () => void }> },
    [step]
  );

  const goNext = useCallback(() => setStep(step + 1), [step]);
  const goBack = useCallback(() => setStep(step - 1), [step]);

  return (
    <form className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" onSubmit={handleSubmit((v) => onSubmit(v))}>
      <ProgressWizard steps={steps} currentStep={step - 1} changeStep={setStep} />
      <FormProvider {...methods}>{Component && <Component goBack={goBack} goNext={goNext} />}</FormProvider>
    </form>
  );
};

export default WalletCreationWizard;
