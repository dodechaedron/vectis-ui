import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'react-use';

import { useChain } from '@cosmos-kit/react-lite';

import { chainIds, chainNames, chains } from '~/configs/chains';
import { getContractAddresses } from '~/configs/contracts';
import { getEndpoints } from '~/configs/endpoints';
import { VectisQueryService, VectisService } from '~/services/vectis';

import { CoinInfo, VectisAccount } from '~/interfaces';
import { Chain } from '@chain-registry/types';

export interface VectisState {
  userAddr: string;
  defaultFee: CoinInfo;
  chainInfo: Chain;
  chainName: string;
  userAddresses: string[];
  setChain: (chainName: string) => void;
  supportedChains: string[];
  queryClient: VectisQueryService;
  signingClient: VectisService;
  account: VectisAccount;
  connect: () => void;
  disconnect: () => void;
}

const supportedChains = ['junotestnet', 'injectivetestnet', 'archwaytestnet', 'neutrontestnet', 'injective-888'];

const VectisContext = createContext<VectisState | null>(null);

export const VectisProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [signingClient, setSigningClient] = useState<VectisService | null>(null);
  const [queryClient, setQueryClient] = useState<VectisQueryService | null>(null);
  const [userAddresses, setUserAddresses] = useState<string[]>([]);
  const [chainName, setChain] = useLocalStorage<string>('vectis@v1:selectedNetwork', chainNames[0]);
  const {
    address,
    chain: chainInfo,
    assets,
    disconnect,
    getOfflineSignerDirect,
    connect,
    isWalletConnected,
    chainWallet
  } = useChain(chainName as string);
  const { query } = useRouter();

  const { data: account } = useQuery<VectisAccount>(
    ['vectis_account', query.vectis],
    () => queryClient!.getAccountInfo(query.vectis as string, chainName as string),
    {
      enabled: Boolean(queryClient) && Boolean(chainName) && Boolean(query.vectis)
    }
  );

  const endpoints = useMemo(() => getEndpoints(chainName as string), [chainName]);

  const defaultFee = useMemo(() => {
    const { average_gas_price, denom } = chainInfo.fees!.fee_tokens[0];
    const assetInfo = assets?.assets.find((asset) => asset.base === denom);
    if (!assetInfo) throw new Error('Fee asset info not found');
    const denomUnit = assetInfo.denom_units.find((u) => u.denom === assetInfo.display);
    if (!denomUnit) throw new Error('Fee denom unit not found');

    return {
      exponent: denomUnit.exponent as number,
      averageGasPrice: average_gas_price as number,
      udenom: assetInfo.base,
      symbol: assetInfo.symbol,
      img: assetInfo.logo_URIs?.svg || assetInfo.logo_URIs?.png || assetInfo.logo_URIs?.jpeg,
      coingeckoId: assetInfo.coingecko_id
    };
  }, [chainInfo, assets]);

  const getUserAddresses = useCallback(async () => {
    if (!chainWallet?.client) return;
    return Promise.all(
      chainIds.map(async (chain) => {
        const account = await chainWallet.client.getAccount?.(chain);
        return account?.address;
      })
    );
  }, [chainWallet]);

  useEffect(() => {
    const addresses = getContractAddresses(chainName as string);
    VectisQueryService.connect(endpoints, addresses).then(setQueryClient);
  }, [chainName]);

  useEffect(() => {
    if (!isWalletConnected || !chainWallet?.client) return;
    setTimeout(async () => {
      for (const chain of chains) {
        await chainWallet.client.addChain?.({ chain, name: chain.chain_name });
      }
      await chainWallet.client.enable?.(chainIds);
      const userAddresses = await Promise.all(
        chainIds.map(async (chain) => {
          const account = await chainWallet.client.getAccount?.(chain);
          return account?.address as string;
        })
      );
      const addresses = getContractAddresses(chainName as string);
      const signer = await getOfflineSignerDirect();
      const txService = await VectisService.connectWithSigner(signer, { endpoints, defaultFee, addresses });
      setUserAddresses(userAddresses);
      setSigningClient(txService);
    }, 100);
  }, [chainInfo, address, isWalletConnected]);

  return (
    <VectisContext.Provider
      value={
        {
          userAddr: address,
          defaultFee,
          chainInfo,
          chainName,
          setChain,
          userAddresses,
          supportedChains,
          queryClient,
          signingClient,
          account,
          connect,
          disconnect
        } as VectisState
      }
    >
      {children}
    </VectisContext.Provider>
  );
};

export const useVectis = (): VectisState => {
  const context = useContext(VectisContext);
  if (context === null) {
    throw new Error('useVectis must be used within a CosmWasmProvider');
  }
  return context;
};
