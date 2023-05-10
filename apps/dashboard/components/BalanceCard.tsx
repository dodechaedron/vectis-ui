import React, { useState } from 'react';
import { useApp } from 'providers';
import { convertMicroDenomToDenom } from 'utils/conversion';

import { Coin } from '@cosmjs/amino';

const BalanceCard: React.FC = () => {
  const { defaultFee, account } = useApp();
  const [balance, setBalance] = useState<Coin>({ amount: '0', denom: defaultFee.symbol });

  return (
    <div className="flex flex-col gap-1">
      <p>Balance</p>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex items-center gap-2 px-4 py-4 sm:px-6">
            <img className="h-12 w-12 rounded-full" src={defaultFee.img} />
            <div className="flex flex-1 items-center justify-between">
              <p className="text-md font-medium capitalize text-black">{balance.denom}</p>
              <p className="text-lg text-black/70">{convertMicroDenomToDenom(balance.amount).toFixed(2)}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BalanceCard;
