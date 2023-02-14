import React from 'react';
import { useVectis } from 'providers';
import { convertMicroDenomToDenom } from 'utils/conversion';

const BalanceCard: React.FC = () => {
  const { balance } = useVectis();

  return (
    <div className="flex flex-col gap-1">
      <p>Balance</p>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">

          <li className="flex items-center gap-2 px-4 py-4 sm:px-6">
            <img
              className="h-12 w-12 rounded-full"
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png"
            />
            <div className="flex flex-1 items-center justify-between">
              <p className="text-md font-medium capitalize text-black">{balance.denom.slice(1)}</p>
              <p className="text-lg text-black/70">{convertMicroDenomToDenom(balance.amount).toFixed(2)}</p>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default BalanceCard;
