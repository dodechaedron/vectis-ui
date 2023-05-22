import { ComponentPropsWithoutRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { format } from 'date-fns';
import Snowfall from 'react-snowfall';

import { IntlAddress } from '~/services/browser';

import CardBg from './Icons/CardBg';
import CardInfo from './CardInfo';

import { BsSnow2 } from 'react-icons/bs';
import { FaAsterisk } from 'react-icons/fa';

import { VectisAccount } from '~/interfaces';

interface Props {
  smartAccount: VectisAccount;
}

const SmartAccountCard: React.FC<Props & ComponentPropsWithoutRef<'div'>> = ({ smartAccount, className }) => {
  const { push: goToPage } = useRouter();

  const selectWallet = useCallback(async () => {
    goToPage('/dashboard?vectis=' + smartAccount.address);
  }, [smartAccount]);

  return (
    <div
      data-testid="card-wallet"
      onClick={selectWallet}
      className={clsx(
        `normal-direction relative mx-auto flex h-[13.3rem] w-full max-w-[24rem] cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-cover text-gray-100 shadow-md transition-all hover:brightness-110`,
        className
      )}
    >
      <CardBg />
      <div
        className={clsx(
          'absolute flex h-full w-full flex-col justify-between rounded-md backdrop-blur-sm',
          smartAccount.frozen ? 'bg-gradient-to-tr from-[#2F80ED]/40 to-[#B2FFDA]/40' : 'bg-white/10 backdrop-blur-sm'
        )}
      >
        {smartAccount.frozen && <Snowfall snowflakeCount={5} />}
        <div className="flex flex-1 flex-col justify-between rounded-md py-4 px-6">
          <div className="flex w-full items-center justify-between gap-4">
            <div className={clsx(smartAccount.frozen && 'flex items-center justify-center gap-2')}>
              <div>{smartAccount.frozen && <BsSnow2 className="h-6 w-6 text-white" />}</div>
              <p className="text-lg capitalize drop-shadow-md">{smartAccount.label}</p>
            </div>
            <CardInfo
              guardians={smartAccount.guardians.length}
              threshold={smartAccount.threshold}
              relayers={smartAccount.relayers.length}
            ></CardInfo>
          </div>
          <p className="text-md mt-2 flex items-center justify-end drop-shadow-md">
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="mr-2 h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="mr-2 h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="h-3 w-3" />
            <FaAsterisk className="mr-2 h-3 w-3" />
            <span>{smartAccount.address.substring(smartAccount.address.length - 4)}</span>
          </p>
          <div className="flex justify-between drop-shadow-md">
            <div>
              <p className="text-[8px] uppercase">Controller</p>
              <p className="text-base">{IntlAddress(smartAccount.controllerAddr)}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase">Created at</p>
              <p className="text-base">{format(new Date(), 'LL/yy')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAccountCard;
