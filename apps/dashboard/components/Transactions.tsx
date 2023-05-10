import React, { useEffect } from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import { IntlAddress, IntlTimeAgo } from '~/services/browser';
import { useApp } from '~/providers';
import { usePagination } from '~/hooks';
import { convertMicroDenomToDenom } from '~/utils/conversion';

import Address from './Address';
import FilterTable from './FilterTable';
import NotFound from './NotFound';
import Pagination from './Pagination';

import { MinusCircleIcon } from '@heroicons/react/24/solid';

import { Transaction } from '~/interfaces/transaction';

interface Props {
  filter?: boolean;
  pagination?: boolean;
  defaultLimit?: number;
}

const TransactionsTable: React.FC<Props> = ({ filter, pagination, defaultLimit = 10 }) => {
  const { chainName, vectis, account, defaultFee } = useApp();
  const [txs, setTxs] = useState<Transaction[]>([]);
  const methods = usePagination({ limit: defaultLimit });
  const { setTotal, page } = methods;

  useEffect(() => {
    const getTxs = async () => {
      const { txs, pagination } = await vectis.getTransactionHistory(account.address, page, defaultLimit);
      setTxs(txs);
      setTotal(pagination.total);
    };
    getTxs();
  }, [page]);

  return (
    <div className="flex w-full flex-1 flex-col rounded-md">
      {filter && <FilterTable />}
      <div className="grid grid-cols-[1fr,_100px,_105px] rounded-t-md bg-gray-50 xl:grid-cols-[200px,_120px,_1fr,_120px,_120px]">
        <div className="py-4 px-2 text-sm  font-semibold text-gray-900">Type</div>
        <div className="py-4 px-2 text-sm  font-semibold text-gray-900">Amount</div>
        <div className="hidden py-4 px-2 text-sm font-semibold  text-gray-900 xl:block">Tx Hash</div>
        <div className="hidden py-4 px-2 text-sm font-semibold  text-gray-900 xl:block">Fee</div>
        <div className="py-4 px-2 text-sm  font-semibold text-gray-900">Time</div>
      </div>
      <div className={clsx('h-full flex-1 divide-y divide-gray-200 bg-white', { 'rounded-b-md': !pagination })}>
        {txs.length ? (
          txs.slice(0, defaultLimit).map((tx) => {
            return (
              <div className="grid grid-cols-[1fr,_100px,_105px] xl:grid-cols-[200px,_120px,_1fr,_120px,_120px]" key={tx.txHash}>
                <div className="flex h-fit items-center justify-start py-4 px-2">
                  <p className="h-fit rounded-md bg-kashmir-blue-500 py-[2px] px-2 text-center text-xs capitalize text-white">{tx.type}</p>
                </div>
                <div className="flex h-fit items-center justify-start py-4 px-2 text-sm text-gray-500">
                  <p>
                    {convertMicroDenomToDenom(tx.funds.amount)} {tx.funds.denom}
                  </p>
                </div>
                <div className="hidden overflow-auto py-4 px-2 text-xs xl:flex">
                  <a
                    href={`https://${chainName.includes('testnet') ? 'testnet' : 'www'}.mintscan.io/${chainName.replace(
                      'testnet',
                      '-testnet'
                    )}/txs/${tx.txHash}`}
                    target="_blank"
                    className="flex h-full w-full items-center justify-start text-kashmir-blue-600 hover:text-kashmir-blue-900"
                    rel="noreferrer"
                  >
                    <Address address={tx.txHash} />
                  </a>
                </div>
                <div className="hidden h-fit items-center justify-start py-4 px-2 text-center text-sm text-gray-500 xl:flex">
                  {convertMicroDenomToDenom(tx.fee.amount, defaultFee.exponent)} {tx.fee.denom}
                </div>
                <div className="flex h-fit items-center justify-start py-4 px-2 text-sm text-gray-500">
                  <p>{IntlTimeAgo(tx.timestamp)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <NotFound icon={MinusCircleIcon} text="No Transactions" />
        )}
      </div>
      {pagination && <Pagination {...methods} />}
    </div>
  );
};

export default TransactionsTable;
