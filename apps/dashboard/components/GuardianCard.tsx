import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useVectis } from "providers";
import Snowfall from "react-snowfall";

import ShieldNotification from "./Icons/ShieldNotification";

import { BsSnow2 } from "react-icons/bs";
import { RiRotateLockFill } from "react-icons/ri";

import { WalletInfo } from "@vectis/types/Proxy.types";

interface Props {
  walletAddress: string;
}

const GuardianCard: React.FC<Props> = ({ walletAddress }) => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const { queryClient } = useVectis();

  useEffect(() => {
    queryClient.getWalletInfo(walletAddress).then(setWalletInfo);
  }, []);

  if (!walletInfo) return null;

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div
        className={clsx(
          "relative flex w-full items-center justify-between space-x-6 py-4 px-6 rounded-t-lg",
          walletInfo.is_frozen && "bg-gradient-to-tr from-gradient-ocean-from/20 to-gradient-ocean-to/20"
        )}
      >
        <div className="flex-1 min-h-[4rem] flex flex-col justify-between truncate">
          <div className="flex items-center  justify-between space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">{walletInfo.label}</h3>
            <ShieldNotification />
          </div>
          <p className="truncate text-sm text-gray-500">{walletAddress}</p>
          {walletInfo.is_frozen && <Snowfall snowflakeCount={5} />}
        </div>
      </div>
      <div>
        <div className="-mt-px flex">
          <div className="flex w-0 flex-1">
            <button className="group relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:bg-kashmir-blue-200/20">
              <BsSnow2 className="w-6 h-6 text-gray-400 group-hover:text-kashmir-blue-400" />
              <span className="ml-3">Freeze</span>
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              onClick={() => console.log("freeze")}
              className="group relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:bg-kashmir-blue-200/20"
            >
              <RiRotateLockFill className="w-6 h-6 text-gray-400 group-hover:text-kashmir-blue-400" aria-hidden="true" />
              <span className="ml-3">Rotate Key</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GuardianCard;
