import React from "react";

import { useVectis } from "~/providers";

import { BsSnow2 } from "react-icons/bs";
import { FaKey, FaUserShield } from "react-icons/fa";
import { GoShield } from "react-icons/go";

const SmartAccountInfo: React.FC = () => {
  const { account } = useVectis();
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between gap-4 xl:gap-8 ">
        <div className="flex flex-col lg:gap-2 items-center justify-center">
          <p className="text-[10px] md:text-[10px] uppercase w-full">Guardians</p>
          <div className="flex gap-2  items-center justify-center">
            <FaUserShield className="h-5 w-5 lg:h-6 lg:w-8" />
            <p className="text-center text-lg">{account.guardians.length}</p>
          </div>
        </div>
        <div className="flex flex-col lg:gap-2 items-center justify-center">
          <p className="text-[10px] md:text-[10px] uppercase w-full">Threshold</p>
          <div className="flex gap-2 items-center justify-center">
            <GoShield className="h-5 w-5 lg:h-6 lg:w-8" />
            <p className="text-center text-lg">0</p>
          </div>
        </div>
        <div className="flex flex-col lg:gap-2 items-center justify-center">
          <p className="text-[10px] md:text-[10px] uppercase w-full">Relayers</p>
          <div className="flex gap-2 items-center justify-center">
            <FaKey className="h-5 w-5 lg:h-6 lg:w-8" />
            <p className="text-center text-lg">{account.relayers.length}</p>
          </div>
        </div>
      </div>
      {account.is_frozen && <BsSnow2 className="w-6 h-6 lg:h-8 lg:w-8 text-white" />}
    </div>
  );
};

export default SmartAccountInfo;
