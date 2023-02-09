import React from 'react';
import { format } from 'date-fns';

import Cancel from './Icons/Cancel';
import Success from './Icons/Success';

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

const mockTransactions = [
  { trName: 'test', trSubname: 'test', trAmount: 100, trDate: new Date(), status: 'success', type: 'send' },
  { trName: 'test', trSubname: 'test', trAmount: 100, trDate: new Date(), status: 'success', type: 'receive' },
  { trName: 'test', trSubname: 'test', trAmount: 100, trDate: new Date(), status: 'success', type: 'send' },
  { trName: 'test', trSubname: 'test', trAmount: 100, trDate: new Date(), status: 'success', type: 'send' },
  { trName: 'test', trSubname: 'test', trAmount: 100, trDate: new Date(), status: 'success', type: 'receive' },
  { trName: 'test', trSubname: 'test', trAmount: 100, trDate: new Date(), status: 'success', type: 'receive' }
];

const LastTransactions: React.FC = () => {
  /* pensando en hacerlo como en tailwind con tables en vez de en grid*/
  return (
    <div className="rounded-md flex flex-col w-full bg-white">
      <div className="flex justify-between items-center bg-gray-300/50 rounded-t-md py-2 px-4">
        <p className="lg:text-lg">Last transactions</p>
        <p className="text-sm text-gray-500">Recent</p>
      </div>
      <div className="grid grid-cols-4 text-sm xl:text-base">
        {mockTransactions.map(({ trName, trSubname, trAmount, trDate, status, type }, i) => {
          return (
            <React.Fragment key={`transaction-${i}`}>
              <div className="flex items-center justify-start gap-2 py-2 px-4">
                <div className="w-6 h-6">
                  {type.includes('receive') ? (
                    <FaArrowAltCircleDown className="text-kashmir-blue-500 w-6 h-6" />
                  ) : (
                    <FaArrowAltCircleUp className="text-pink-800 w-6 h-6" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p>{trName}</p>
                  <p className="text-xs text-gray-500">{trSubname}</p>
                </div>
              </div>
              <div className="flex items-center justify-center">{format(trDate, 'd LLL ')}</div>
              <div className="flex items-center justify-center">{trAmount} JUNOX</div>
              <div className="flex items-center justify-end px-4 gap-2 uppercase text-xs">
                {status.includes('success') ? (
                  <Success className="text-kashmir-blue-500 w-6 h-6" />
                ) : (
                  <Cancel className="text-pink-800 w-6 h-6" />
                )}
                <p className="hidden lg:block">{status.includes('success') ? 'Accepted' : 'Rejected'}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LastTransactions;
