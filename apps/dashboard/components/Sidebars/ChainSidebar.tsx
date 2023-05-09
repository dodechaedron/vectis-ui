import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useVectis } from '~/providers';
import { useSidebar } from '~/providers/SidebarProvider';

const ChainSidebar: React.FC = () => {
  const { hideSidebar, isSidebarVisible } = useSidebar();
  const { supportedChains } = useVectis();

  const changeChain = (chainName: string) => {
    hideSidebar();
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        'absolute top-[72px] right-[-100%] z-50 flex h-[calc(100vh-72px)] min-w-[12rem] flex-col space-y-1 bg-white p-2 transition-all',
        { '!right-0': isSidebarVisible }
      )}
    >
      {supportedChains.map((chain) => (
        <div
          key={chain}
          className="flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm font-medium capitalize text-kashmir-blue-500 transition-all hover:bg-gray-100"
          onClick={() => changeChain(chain)}
        >
          <div className="h-5 w-5 rounded-full bg-kashmir-blue-500" />
          {chain.replace('testnet', ' Testnet')}
        </div>
      ))}
    </motion.div>
  );
};

export default ChainSidebar;
