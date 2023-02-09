import React from "react";
import { useVectis } from "providers";
import { convertMicroDenomToDenom } from "utils/conversion";

interface Props {
  numberOfAccounts: number;
  totalBalance: number;
}

const SmartAccountStatictis: React.FC<Props> = ({ numberOfAccounts, totalBalance }) => {
  const { network } = useVectis();
  return (
    <>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Accounts</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{numberOfAccounts}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Balance</dt>
          <dd className="mt-1 text-3xl font-semibold uppercase tracking-tight text-gray-900">
            {convertMicroDenomToDenom(totalBalance)} {network.feeToken.slice(1)}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Transactions</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
        </div>
      </dl>
    </>
  );
};

export default SmartAccountStatictis;
