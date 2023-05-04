import React from 'react';
import { useRouter } from 'next/router';

import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import { Button } from '../Buttons';

const StepConfirmation: React.FC = () => {
  const { signingClient } = useVectis();
  const { toast } = useToast();
  const { push: goToPage } = useRouter();

  const handleMint = async () => {
    goToPage('/accounts');
  };

  return (
    <>
      <div className="mt-5 flex w-full justify-center bg-white p-4 shadow sm:rounded-lg">
        <div className="bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Account Created</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              When you create a vectis account you are entitled to purchase 2 govec per account. <br />
              ¿Do you want to buy govec now?
            </p>
            <Button className="mx-auto my-2" onClick={handleMint}>
              Get Govec
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepConfirmation;
