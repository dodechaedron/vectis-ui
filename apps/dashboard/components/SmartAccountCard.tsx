import { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { format } from 'date-fns';
import Snowfall from 'react-snowfall';
import Link from 'next/link';

import { Coin } from '@cosmjs/amino';

import { IntlAddress } from '~/services/browser';
import { useVectis } from '~/providers/VectisProvider';

import { BsAsterisk, BsSnow2 } from 'react-icons/bs';
import { IoShieldOutline } from 'react-icons/io5';

import { WalletInfo } from '@vectis/types/Proxy.types';

interface Props {
  smartAccount: WalletInfo & { balance: Coin; address: string; createdAt: string };
}

const SmartAccountCard: React.FC<Props> = ({ smartAccount }) => {
  const { changeAccount } = useVectis();
  const { push: goToPage } = useRouter();

  const selectWallet = useCallback(async () => {
    if (!smartAccount) return;
    changeAccount(smartAccount);
    goToPage('/dashboard');
  }, [smartAccount]);

  return (
    <div
      data-testid="card-wallet"
      onClick={selectWallet}
      style={{ backgroundImage: `url('/visa-bg-${3 % 4}.jpg')` }}
      className={`bg-cover overflow-hidden relative cursor-pointer w-full rounded-md text-gray-100 h-[12rem] max-w-[24rem] mx-auto hover:brightness-110 transition-all shadow-md flex flex-col justify-between`}
    >
      <div
        className={clsx(
          'w-full h-full flex flex-col justify-between backdrop-blur-sm',
          smartAccount.is_frozen
            ? 'bg-gradient-to-tr from-[#2F80ED] to-[#B2FFDA]/50'
            : 'bg-gradient-to-br from-white/30 via-kashmir-blue-500/50 to-white/50'
        )}
      >
        {smartAccount.is_frozen && <Snowfall snowflakeCount={5} />}
        <div className="py-4 px-6 flex flex-col justify-between flex-1">
          <div className="w-full flex gap-4 justify-between items-center">
            <div>
              <div className="relative rounded-md border border-white text-white w-[3.2rem] h-[2.7rem] flex items-center justify-center bg-white/30">
                <IoShieldOutline className="h-[1.9rem] w-[1.9rem]" />
                <p className="text-base absolute left-0 top-0 right-0 bottom-0 m-auto flex items-center justify-center mb-[2px]">
                  {smartAccount.guardians.length}
                </p>
              </div>
            </div>
            <div className={clsx(smartAccount.is_frozen && 'flex gap-2')}>
              <p className="text-lg drop-shadow-md text-right">{smartAccount.label}</p>
              <div>{smartAccount.is_frozen && <BsSnow2 className="w-6 h-6 text-white" />}</div>
            </div>
          </div>
          <p className="text-md flex items-center justify-star mt-2 drop-shadow-md">
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3 mr-2" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3 mr-2" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3 mr-2" />
            ... {smartAccount.address.substring(smartAccount.address.length - 4)}
          </p>
          <div className="flex justify-between drop-shadow-md">
            <div>
              <p className="text-[8px] uppercase">Controller</p>
              <p className="text-base">{IntlAddress(smartAccount.controller_addr)}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase">Created at</p>
              <p className="text-base">{format(new Date(smartAccount.createdAt), 'LL/yy')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAccountCard;
