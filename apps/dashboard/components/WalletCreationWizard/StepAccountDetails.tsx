import React from 'react';
import { useMemo } from 'react';
import { Input } from 'components/Inputs';
import InputPrice from 'components/Inputs/InputPrice';
import { useVectis } from 'providers';
import { useFormContext } from 'react-hook-form';
import { convertMicroDenomToDenom } from 'utils/conversion';

import { Coin } from '@cosmjs/amino';
import { useQuery } from '@tanstack/react-query';

import { Button } from '../Buttons';
import InputSelector from '../Inputs/InputSelector';

interface Props {
  goBack: () => void;
  goNext: () => void;
}

const StepAccountDetails: React.FC<Props> = ({ goBack, goNext }) => {
  const { vectis, defaultFee, userAddr, chains, chain, setChain } = useVectis();
  const { register, watch, setValue, formState } = useFormContext();
  const { errors } = formState;

  const { data: balance } = useQuery(['balance', userAddr, vectis], () => vectis?.getBalance(userAddr, defaultFee.udenom), {
    initialData: { amount: '0', denom: defaultFee.udenom }
  });
  const { data: fees } = useQuery(['walletFee', defaultFee.udenom], () => vectis.getFees());

  const initialFunds = watch('initialFunds');
  const accountName = watch('label');

  const chainOptions = useMemo(() => chains.map((c) => ({ label: c.pretty_name, value: c.chain_name })), [chains]);

  const totalCost = useMemo(
    () => Number(convertMicroDenomToDenom(fees?.wallet_fee?.amount, defaultFee.exponent)) + Number(initialFunds),
    [fees, initialFunds]
  );

  return (
    <div className="mt-5 w-full">
      <div className="flex min-h-[35rem] rounded-lg bg-white p-4 shadow md:p-6">
        <div className="flex-1 gap-4 xl:grid xl:grid-cols-3">
          <div className="flex flex-col justify-start gap-2 border-b border-gray-200 pb-4 xl:col-span-1 xl:border-b-0 xl:border-r">
            <section>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Why creation fee?</h3>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                This fee is held in the DAO treasury and managed by the DAO members via proposals voting.
                <br />
              </p>
            </section>
          </div>

          <div className="mt-3 gap-4  xl:col-span-2 xl:mt-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Account Name</h3>
              <p className="text-sm text-gray-500">This is the name given to the wallet to make easily to identify.</p>
              <Input placeholder="Account Name" {...register('label')} error={errors?.label?.message?.toString()} />
              <p className="my-4 sm:border-t sm:border-gray-200" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Initial Funds</h3>

              <div className="flex flex-col gap-6">
                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <InputPrice
                    label="How much do you want to fund your Vectis Account?"
                    placeholder="0"
                    currency={defaultFee.symbol}
                    className="w-full"
                    inputMode="decimal"
                    value={initialFunds}
                    error={errors.initialFunds?.message?.toString()}
                    onChange={(e) => setValue('initialFunds', Number(e.target.value.replace('-', '0')), { shouldValidate: true })}
                  />
                  <InputPrice
                    label="Current Wallet balance (EOA)"
                    className="w-full"
                    value={convertMicroDenomToDenom(balance.amount, defaultFee.exponent)}
                    currency={defaultFee.symbol}
                    disabled
                  />
                </div>

                <div className="flex w-full flex-col gap-4 md:flex-row">
                  <InputPrice
                    className="w-full"
                    label="Creation Fee"
                    value={convertMicroDenomToDenom(fees?.wallet_fee?.amount, defaultFee.exponent)}
                    currency={defaultFee.symbol}
                    disabled
                  />
                  <InputPrice className="w-full" label="Total cost" value={totalCost} currency={defaultFee.symbol} disabled />
                </div>
              </div>
              <p className="my-4 sm:border-t sm:border-gray-200" />
            </div>

            <div className="flex w-full flex-col gap-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Network</h3>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-700">What network do you want to deploy your account?</p>
                <InputSelector
                  className="w-full lg:w-[50%]"
                  options={chainOptions}
                  value={{ value: chain.chain_name, label: chain.pretty_name }}
                  onChange={(e) => setChain(e.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={goNext} className="mt-5" disabled={!accountName?.length || !!Object.keys(errors).length}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepAccountDetails;
