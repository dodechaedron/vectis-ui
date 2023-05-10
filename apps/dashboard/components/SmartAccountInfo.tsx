import React from 'react';

import { useApp } from '~/providers';

import { BsSnow2 } from 'react-icons/bs';
import { FaKey, FaUserShield } from 'react-icons/fa';
import { GoShield } from 'react-icons/go';

const SmartAccountInfo: React.FC = () => {
  const { account } = useApp();
  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-between gap-4 xl:gap-8 ">
        <div className="flex flex-col items-center justify-center lg:gap-2">
          <p className="w-full text-[10px] uppercase md:text-[10px]">Guardians</p>
          <div className="flex items-center  justify-center gap-2">
            <FaUserShield className="h-5 w-5 lg:h-6 lg:w-8" />
            <p className="text-center text-lg">{account.guardians.length}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center lg:gap-2">
          <p className="w-full text-[10px] uppercase md:text-[10px]">Threshold</p>
          <div className="flex items-center justify-center gap-2">
            <GoShield className="h-5 w-5 lg:h-6 lg:w-8" />
            <p className="text-center text-lg">{account.threshold.weight}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center lg:gap-2">
          <p className="w-full text-[10px] uppercase md:text-[10px]">Relayers</p>
          <div className="flex items-center justify-center gap-2">
            <FaKey className="h-5 w-5 lg:h-6 lg:w-8" />
            <p className="text-center text-lg">{account.relayers.length}</p>
          </div>
        </div>
      </div>
      {account.frozen && <BsSnow2 className="h-6 w-6 text-white lg:h-8 lg:w-8" />}
    </div>
  );
};

export default SmartAccountInfo;
