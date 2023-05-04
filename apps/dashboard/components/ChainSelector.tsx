import React from 'react';

import { useVectis } from '~/providers';
import { capitalize } from '~/utils/conversion';

import InputSelector from './Inputs/InputSelector';

const ChainSelector: React.FC = () => {
  const { supportedChains, chainName, setChain } = useVectis();
  return (
    <InputSelector
      options={supportedChains.map((chain) => ({ value: chain, label: capitalize(chain).replace('testnet', ' Testnet') }))}
      value={{ value: chainName, label: capitalize(chainName).replace('testnet', ' Testnet') }}
      onChange={(e) => setChain(e.value)}
    />
  );
};

export default ChainSelector;
