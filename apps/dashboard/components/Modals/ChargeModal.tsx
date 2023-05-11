import React, { useState } from 'react';

import { useApp, useModal } from '~/providers';
import { useToast } from '~/hooks';
import { coin, convertDenomToMicroDenom } from '~/utils/conversion';

import { Button } from '../Buttons';
import { Input } from '../Inputs';
import InputSelector from '../Inputs/InputSelector';

import Modal from './Modal';

const ChargeModal: React.FC = () => {
  const { hideModal, isModalVisible } = useModal();
  const [amount, setAmount] = useState('0');

  const { toast, isLoading } = useToast();
  const { account, vectis, defaultFee, userAddr } = useApp();

  const tokens = [
    {
      label: defaultFee.symbol,
      value: defaultFee.udenom
    }
  ];

  const onSubmit = async () => {
    const promise = vectis.sendTokens(
      userAddr,
      account.address,
      [coin(convertDenomToMicroDenom(amount, defaultFee.exponent), defaultFee.udenom)],
      'auto'
    );
    await toast.promise(promise);
    hideModal();
  };

  return (
    <Modal isModalVisible={isModalVisible} closeModal={hideModal} title="Top up your smart account">
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <p className="text-sm text-gray-500">Amount will be added to your smart account balance and will be available for you to use.</p>

          <form className="mt-2 flex w-full  flex-wrap justify-start gap-2">
            <Input label="Account" className="w-full" disabled value={account.address} />
            <InputSelector label="Token" className="w-full" value={tokens[0]} options={tokens} />
            <Input label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </form>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Button disabled={isLoading} className="w-full" onClick={onSubmit}>
          Top up
        </Button>
      </div>
    </Modal>
  );
};

export default ChargeModal;
