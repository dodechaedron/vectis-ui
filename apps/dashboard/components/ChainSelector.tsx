import React from 'react';

import { useVectis } from '~/providers';
import { useSidebar } from '~/providers/SidebarProvider';

const ChainSelector: React.FC = () => {
  const { chainName } = useVectis();
  const { showSidebar } = useSidebar();
  return (
    <div className="cursor-pointer rounded-md bg-kashmir-blue-500 p-2 capitalize text-white" onClick={() => showSidebar('chains')}>
      {chainName.replace('testnet', ' Testnet')}
    </div>
  );
};

export default ChainSelector;
