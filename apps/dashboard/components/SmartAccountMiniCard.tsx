import React from "react";
import { useVectis } from "providers";

import { IntlAddress } from "~/services/browser";

import { MdAccountBalanceWallet } from "react-icons/md";

const SmartAccountMiniCard: React.FC = () => {
  const { userAddr, account } = useVectis();

  if (!userAddr || !account) return null;
  return (
    <div className="w-full bg-cover bg-[url('/visa-bg-3.jpg')] overflow-hidden relative rounded-md">
      {account && userAddr === account.controller_addr && (
        <div className="text-right w-full h-full flex flex-col justify-between bg-gradient-to-br from-white/5 via-kashmir-blue-500/90 to-transparent p-4 text-white">
          <div className="flex items-center mb-3 gap-2">
            <MdAccountBalanceWallet className="w-5 h-5" />
            <p className="uppercase text-[8px] text-left">Selected account</p>
          </div>
          <p className="text-sm">{account.label}</p>
          <p className="text-sm">{IntlAddress(account.address, 8)}</p>
        </div>
      )}
    </div>
  );
};

export default SmartAccountMiniCard;
