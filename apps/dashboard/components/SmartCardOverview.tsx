import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useVectis } from 'providers';
import Snowfall from 'react-snowfall';

import { IntlAddress } from '~/services/browser';

import { BsSnow2 } from 'react-icons/bs';
import { FaKey, FaUserShield } from 'react-icons/fa';
import { GoShield } from 'react-icons/go';

const SmartCardOverview: React.FC = () => {
  const { account } = useVectis();
  if (!account) return null;
  return (
    <div
      className="flex-2 relative bg-white w-full bg-cover bg-no-repeat bg-center rounded-lg h-[20rem] "
      style={{ backgroundImage: `url('/visa-bg-3.jpg')` }}
    >
      <div
        className={clsx(
          ' h-full rounded-lg w-full p-4 lg:p-8 text-white flex flex-col justify-between min-h-[18rem]',
          account.is_frozen
            ? 'bg-gradient-to-tr from-[#2F80ED] to-[#B2FFDA]/50'
            : 'bg-gradient-to-br from-white/30 via-kashmir-blue-500/50 to-transparent'
        )}
      >
        {account.is_frozen && <Snowfall snowflakeCount={25} />}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="md:text-lg lg:text-xl xl:text-1xl font-bold">{account.label}</p>
          </div>
          {account.is_frozen && <BsSnow2 className="w-6 h-6 lg:h-8 lg:w-8 text-white" />}
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-between gap-4 lg:gap-8">
            <div className="flex flex-col lg:gap-2">
              <p className="text-[10px] md:text-[10px] uppercase w-full">Guardians</p>
              <div className="flex gap-2">
                <FaUserShield className="h-5 w-5 lg:h-6 lg:w-8" />
                <p className="text-center text-lg">{account.guardians.length}</p>
              </div>
            </div>
            <div className="flex flex-col lg:gap-2">
              <p className="text-[10px] md:text-[10px] uppercase w-full">Threshold</p>
              <div className="flex gap-2">
                <GoShield className="h-5 w-5 lg:h-6 lg:w-8" />
                <p className="text-center text-lg">0</p>
              </div>
            </div>
            <div className="flex flex-col lg:gap-2">
              <p className="text-[10px] md:text-[10px] uppercase w-full">Relayers</p>
              <div className="flex gap-2">
                <FaKey className="h-5 w-5 lg:h-6 lg:w-8" />
                <p className="text-center text-lg">{account.relayers.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase">ADDRESS</p>
          <p className="md:text-md lg:text-lg xl:text-1xl break-all">{account.address}</p>
        </div>
        <div className="flex justify-between drop-shadow-md">
          <div>
            <p className="text-[8px] md:text-[10px] uppercase">Controller</p>
            <p className="text-lg">{IntlAddress(account.controller_addr)}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] md:text-[10px] uppercase">Created at</p>
            <p className="text-lg">{format(new Date(account.createdAt), 'LL/yy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCardOverview;
