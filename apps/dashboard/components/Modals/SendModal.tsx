import React from 'react';
import { useForm } from 'react-hook-form';

import { useModal, useVectis } from '~/providers';
import { useToast } from '~/hooks';
import { useAccount } from '~/hooks/useAccount';

import { Button } from '../Buttons';
import { Input } from '../Inputs';
import InputSelector from '../Inputs/InputSelector';
import Spinner from '../Spinner';

import Modal from './Modal';

interface Inputs {
  recipient: string;
  token: { label: string; value: string };
  amount: string;
  memo: string;
}

const SendModal: React.FC = () => {
  const { hideModal, isModalVisible } = useModal();
  const { toast, isLoading } = useToast();
  const { vectis, defaultFee } = useVectis();
  const { account, isLoading: isAccountLoading } = useAccount();
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const tokens = [
    {
      label: defaultFee.symbol,
      value: defaultFee.udenom
    }
  ];

  const onSubmit = async ({ recipient, amount, memo }) => {
    const promise = vectis.proxyTransfer(account!.address, recipient, amount, memo);
    await toast.promise(promise);
    hideModal();
  };
  return (
    <Modal isModalVisible={isModalVisible} closeModal={hideModal} title="Transfer Funds">
      <div>
        {isAccountLoading ? (
          <Spinner />
        ) : (
          <div className="mt-3 text-center sm:mt-5">
            <form className="mt-2 flex w-full  flex-wrap justify-start gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Input label="Recipient" {...register('recipient')} />
              <InputSelector
                label="Token"
                className="w-full"
                value={watch('token', tokens[0])}
                onChange={(e) => setValue('token', e)}
                options={tokens}
              />
              <Input label="Amount" {...register('amount')} />
              <Input label="Memo (Optional)" className="py-6" {...register('memo')} />
              <Button disabled={isLoading} type="submit" className="w-full">
                Send
              </Button>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SendModal;
