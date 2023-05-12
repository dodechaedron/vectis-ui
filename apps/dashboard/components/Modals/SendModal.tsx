import React from 'react';
import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useModal, useVectis } from '~/providers';
import { useToast } from '~/hooks';
import { convertDenomToMicroDenom } from '~/utils/conversion';

import { Button } from '../Buttons';
import { Input } from '../Inputs';
import InputSelector from '../Inputs/InputSelector';

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
  const { vectis, defaultFee, account } = useVectis();
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: async ({ recipient, amount, memo, token }: Inputs) =>
      await toast.promise(
        vectis.proxyTransfer(
          account.address,
          recipient,
          { amount: convertDenomToMicroDenom(amount, defaultFee.exponent), denom: defaultFee.udenom },
          'auto'
        )
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vectis_account_balances', account?.address], type: 'all' });
      hideModal();
    }
  });

  const tokens = [
    {
      label: defaultFee.symbol,
      value: defaultFee.udenom
    }
  ];

  return (
    <Modal isModalVisible={isModalVisible} closeModal={hideModal} title="Transfer Funds">
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <form className="mt-2 flex w-full  flex-wrap justify-start gap-4" onSubmit={handleSubmit((v) => onSubmit(v))}>
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
      </div>
    </Modal>
  );
};

export default SendModal;
