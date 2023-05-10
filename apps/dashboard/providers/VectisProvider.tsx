import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { getContractAddresses } from '~/configs/contracts';
import { VectisService } from '~/services/vectis';

import { ChainContextState, useChainContext } from './ChainProvider';

export interface VectisContextState extends ChainContextState {
  vectis: VectisService;
}

const VectisContext = createContext<VectisContextState | null>(null);

export const VectisProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [vectisService, setVectisService] = useState<VectisService | null>(null);

  const chainContext = useChainContext();
  const { isWalletConnected, chainName, getOfflineSigner, endpoints, defaultFee } = chainContext;

  useEffect(() => {
    if (!isWalletConnected) return;
    const buildVectisService = async () => {
      const addresses = getContractAddresses(chainName as string);
      const signer = await getOfflineSigner();
      const vectisService = await VectisService.connectWithSigner(signer, { endpoints, defaultFee, addresses });
      setVectisService(vectisService);
    };
    buildVectisService();
  }, [chainName]);

  return (
    <VectisContext.Provider
      value={
        {
          ...chainContext,
          vectis: vectisService
        } as VectisContextState
      }
    >
      {children}
    </VectisContext.Provider>
  );
};

export const useVectis = (): VectisContextState => {
  const context = useContext(VectisContext);
  if (context === null) {
    throw new Error('useVectis must be used within a VectisProvider');
  }
  return context;
};
