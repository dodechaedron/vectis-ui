import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useApp } from 'providers';
import Snowfall from 'react-snowfall';

import { IntlAddress } from '~/services/browser';

import { BsSnow2 } from 'react-icons/bs';
import { FaKey, FaUserShield } from 'react-icons/fa';
import { GoShield } from 'react-icons/go';

const SmartCardOverview: React.FC = () => {
  const { account } = useApp();
  if (!account) return null;
  return (
    <div
      className="flex-2 relative h-[20rem] w-full rounded-lg bg-white bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url('/visa-bg-3.jpg')` }}
    >
      <div
        className={clsx(
          ' flex h-full min-h-[18rem] w-full flex-col justify-between rounded-lg p-4 text-white lg:p-8',
          account.frozen
            ? 'bg-gradient-to-tr from-[#2F80ED] to-[#B2FFDA]/50'
            : 'bg-gradient-to-br from-white/30 via-kashmir-blue-500/50 to-transparent'
        )}
      >
        {account.frozen && <Snowfall snowflakeCount={25} />}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="xl:text-1xl font-bold md:text-lg lg:text-xl">{account.label}</p>
          </div>
          {account.frozen && <BsSnow2 className="h-6 w-6 text-white lg:h-8 lg:w-8" />}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex justify-between gap-4 lg:gap-8">
            <div className="flex flex-col lg:gap-2">
              <p className="w-full text-[10px] uppercase md:text-[10px]">Guardians</p>
              <div className="flex gap-2">
                <FaUserShield className="h-6 w-6 lg:h-6 lg:w-8" />
                <p className="text-center text-lg">{account.guardians.length}</p>
              </div>
            </div>
            <div className="flex flex-col lg:gap-2">
              <p className="w-full text-[10px] uppercase md:text-[10px]">Threshold</p>
              <div className="flex gap-2">
                <GoShield className="h-5 w-5 lg:h-6 lg:w-8" />
                <p className="text-center text-lg">0</p>
              </div>
            </div>
            <div className="flex flex-col lg:gap-2">
              <p className="w-full text-[10px] uppercase md:text-[10px]">Relayers</p>
              <div className="flex gap-2">
                <FaKey className="h-5 w-5 lg:h-6 lg:w-8" />
                <p className="text-center text-lg">{account.relayers.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase">ADDRESS</p>
          <p className="md:text-md xl:text-1xl break-all lg:text-lg">{account.address}</p>
        </div>
        <div className="flex justify-between drop-shadow-md">
          <div>
            <p className="text-[8px] uppercase md:text-[10px]">Controller</p>
            <p className="text-lg">{IntlAddress(account.controllerAddr)}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase md:text-[10px]">Created at</p>
            <p className="text-lg">{format(new Date(), 'LL/yy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCardOverview;
