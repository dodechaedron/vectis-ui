import React from 'react';

import { FaKey, FaUserShield } from 'react-icons/fa';
import { GoShield } from 'react-icons/go';

interface Props {
  guardians: number;
  relayers: number;
  threshold: { weight: number; totalWeight: number };
}

const CardInfo: React.FC<Props> = ({ guardians, relayers, threshold }) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-[8px] uppercase">Guardians</p>
        <div className="flex items-center  justify-center gap-2">
          <FaUserShield className="h-4 w-4" />
          <p className="text-medium text-center">{guardians}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[8px] uppercase">Threshold</p>
        <div className="flex items-center justify-center gap-2">
          <GoShield className="h-4 w-4" />
          <p className="text-medium text-center">{threshold.weight}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[8px] uppercase">Relayers</p>
        <div className="flex items-center justify-center gap-2">
          <FaKey className="h-4 w-4" />
          <p className="text-medium text-center">{relayers}</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
