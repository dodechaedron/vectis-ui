import React from 'react';
import { convertMicroDenomToDenom } from 'utils/conversion';

import { useQueryBalance } from '~/hooks';

const BalanceCard: React.FC = () => {
  const { data } = useQueryBalance();

  return (
    <div className="flex flex-col gap-1">
      <p>Balance</p>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {data?.balances.map((c) => {
            return (
              <li key={c.base} className="flex items-center gap-2 px-4 py-4 sm:px-6">
                <img className="h-12 w-12 rounded-full" src={c.logo} />
                <div className="flex flex-1 items-center justify-between">
                  <p className="text-md font-medium capitalize text-black">{c.symbol}</p>
                  <p className="text-lg text-black/70">{convertMicroDenomToDenom(c.amount, c.decimals).toFixed(2)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BalanceCard;
