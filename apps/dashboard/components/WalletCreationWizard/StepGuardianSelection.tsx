import React, { useEffect, useMemo } from 'react';
import InputArray from 'components/Inputs/InputArray';
import InputRange from 'components/Inputs/InputRange';
import InputSwitch from 'components/Inputs/InputSwitch';
import { useFormContext } from 'react-hook-form';

import { Button } from '../Buttons';

import { WalletCreationForm } from './index';

interface Props {
  goNext: () => void;
}

const StepGuardianSelection: React.FC<Props> = ({ goNext }) => {
  const { control, watch, formState, setValue } = useFormContext<WalletCreationForm>();
  const { errors } = formState;

  const guardianErrors = useMemo(() => errors?.guardians?.map?.((e) => e?.address?.message), [formState]);

  const guardians = watch('guardians');

  const multisig = watch('multisig');
  const threshold = watch('threshold');

  useEffect(() => {
    setValue('threshold', multisig ? 1 : 0);
  }, [multisig]);

  return (
    <div className="mt-5">
      <div className="flex min-h-[35rem] rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <div className="flex-1 xl:grid xl:grid-cols-3 xl:gap-4">
          <div className="flex flex-col justify-evenly gap-2 border-b border-gray-200 pb-4 xl:col-span-1 xl:border-b-0 xl:border-r">
            <section>
              <h3 className="text-lg font-medium leading-6 text-gray-900">What is a guardian ?</h3>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                The purpose of a guardian is to provide a means of recovering access to a wallet or account in the event that the primary owner
                loses their private key or otherwise becomes unable to access their funds. <br />
              </p>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                This is often done as a security measure to ensure that funds cannot be permanently lost if something happens to the primary
                owner
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium leading-6 text-gray-900">What is a multisig ?</h3>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                The purpose of a multisig in social recovery is to provide a means of recovering access to a wallet or account in the event that
                the primary owner loses their private key or otherwise becomes unable to access their funds.
              </p>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                By requiring multiple signatures to authorize a transaction, a multisig setup allows a group of people (such as friends or
                family members) to jointly control a wallet and to recover access to it if the primary owner is unable to do so.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-medium leading-6 text-gray-900">What is the threshold ?</h3>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                In a multisig contract, the threshold refers to the number of signatures required to authorize a transaction.
              </p>
            </section>
          </div>

          <div className="mt-3 xl:col-span-2 xl:mt-0 ">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Guardian List</h3>
              <p className="mt-1 text-sm text-gray-500">This is the list of the guardians who could recover your account.</p>
              <InputArray control={control} name="guardians" errors={guardianErrors} />
              {errors.guardians && <p className="text-sm text-red-500">{errors.guardians.message}</p>}
            </div>
            <p className="my-2 sm:border-t sm:border-gray-200" />

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
      </div>

      <div className="flex justify-end">
        <Button onClick={goNext} className="mt-5" disabled={!guardians?.[0].address?.length || !!errors?.guardians?.length}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepGuardianSelection;
