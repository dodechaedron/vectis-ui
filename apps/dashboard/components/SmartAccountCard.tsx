import { useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { format } from 'date-fns';
import Snowfall from 'react-snowfall';

import { IntlAddress } from '~/services/browser';
import { useVectis } from '~/providers/VectisProvider';

import CardInfo from './CardInfo';

import { BsAsterisk, BsSnow2 } from 'react-icons/bs';

import { VectisAccount } from '~/interfaces';

interface Props {
  smartAccount: VectisAccount;
}

const SmartAccountCard: React.FC<Props> = ({ smartAccount }) => {
  const { push: goToPage } = useRouter();

  const selectWallet = useCallback(async () => {
    goToPage('/dashboard?vectis=' + smartAccount.address);
  }, [smartAccount]);

  return (
    <div
      data-testid="card-wallet"
      onClick={selectWallet}
      style={{ backgroundImage: `url('/visa-bg-${3 % 4}.jpg')` }}
      className={`relative mx-auto flex h-[12rem] w-full max-w-[24rem] cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-cover text-gray-100 shadow-md transition-all hover:brightness-110`}
    >
      <div
        className={clsx(
          'flex h-full w-full flex-col justify-between backdrop-blur-sm',
          smartAccount.frozen
            ? 'bg-gradient-to-tr from-[#2F80ED] to-[#B2FFDA]/50'
            : 'bg-gradient-to-br from-white/30 via-kashmir-blue-500/50 to-white/50'
        )}
      >
        {smartAccount.frozen && <Snowfall snowflakeCount={5} />}
        <div className="flex flex-1 flex-col justify-between py-4 px-6">
          <div className="flex w-full items-center justify-between gap-4">
            <div className={clsx(smartAccount.frozen && 'flex items-center justify-center gap-2')}>
              <div>{smartAccount.frozen && <BsSnow2 className="h-6 w-6 text-white" />}</div>
              <p className="text-right text-lg drop-shadow-md">{smartAccount.label}</p>
            </div>
            <CardInfo
              guardians={smartAccount.guardians.length}
              threshold={smartAccount.threshold}
              relayers={smartAccount.relayers.length}
            ></CardInfo>
          </div>
          <p className="text-md justify-star mt-2 flex items-center drop-shadow-md">
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="mr-2 h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="mr-2 h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="h-3 w-3" />
            <BsAsterisk className="mr-2 h-3 w-3" />
            ... {smartAccount.address.substring(smartAccount.address.length - 4)}
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
