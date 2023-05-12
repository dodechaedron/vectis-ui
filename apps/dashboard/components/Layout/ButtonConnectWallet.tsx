import React from 'react';
import clsx from 'clsx';

import { useVectis } from '~/providers';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiOutlineWallet } from 'react-icons/hi2';
import { TbPlugConnected } from 'react-icons/tb';

const ButtonConnectWallet: React.FC = () => {
  const { username, disconnect, connect } = useVectis();
  return (
    <>
      {username ? (
        <button className="group relative flex items-center justify-center text-sm " onClick={disconnect}>
          <div className="relative z-20 min-w-[5.5rem] p-2 pl-1 group-hover:text-white">
            <span className="absolute inset-0 left-0 z-20 m-auto block truncate p-2 pr-0 group-hover:scale-0">{username}</span>
            <span className="text-transparent">{username}</span>
            <span className="m-autoblock absolute inset-0 z-20 scale-0 p-2 pr-0 group-hover:scale-100">Disconect</span>
          </div>
          <span
            className={clsx(
              'absolute right-0 h-full w-9 rounded-full bg-kashmir-blue-500 p-2 transition-all group-hover:w-full group-hover:bg-red-800'
            )}
          ></span>
          <span className="relative block w-9">
            <HiOutlineWallet className="absolute inset-0 z-20 m-auto h-5 w-5 text-white transition-all group-hover:scale-0" />
            <TbPlugConnected className="absolute inset-0 z-20 m-auto h-5 w-5 scale-0 text-white transition-all group-hover:scale-100" />
          </span>
        </button>
      ) : (
        <>
          <button onClick={connect} className="group relative flex  items-center  justify-center text-sm">
            <span className="relative z-20 min-w-[5.5rem] p-2 pr-0 group-hover:text-white">Connect</span>
            <span className={clsx('absolute right-0 h-full w-9 rounded-full bg-kashmir-blue-500 p-2 transition-all group-hover:w-full')}></span>
            <span className="relative block w-9">
              <AiOutlineArrowLeft className="absolute inset-0 z-20 m-auto h-5 w-5 text-white transition-all group-hover:scale-0" />
              <TbPlugConnected className="absolute inset-0 z-20 m-auto h-5 w-5 scale-0 text-white transition-all group-hover:scale-100" />
            </span>
          </button>
        </>
      )}
    </>
  );
};

export default ButtonConnectWallet;
