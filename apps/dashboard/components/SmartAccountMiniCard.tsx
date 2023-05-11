import React from 'react';
import { useVectis } from 'providers';

import { IntlAddress } from '~/services/browser';
import { useAccount } from '~/hooks/useAccount';

import { MdAccountBalanceWallet } from 'react-icons/md';

const SmartAccountMiniCard: React.FC = () => {
  const { userAddr } = useVectis();
  const { account } = useAccount();

  if (!userAddr || !account) return null;
  return (
    <div className="relative w-full overflow-hidden rounded-md bg-[url('/visa-bg-3.jpg')] bg-cover">
      {account && userAddr === account.controllerAddr && (
        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-white/5 via-kashmir-blue-500/90 to-transparent p-4 text-right text-white">
          <div className="mb-3 flex items-center gap-2">
            <MdAccountBalanceWallet className="h-5 w-5" />
            <p className="text-left text-[8px] uppercase">Selected account</p>
          </div>
          <p className="text-sm">{account.label}</p>
          <p className="text-sm">{IntlAddress(account.address, 8)}</p>
        </div>
      )}
    </div>
  );
};

export default SmartAccountMiniCard;
