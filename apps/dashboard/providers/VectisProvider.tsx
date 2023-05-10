import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

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
  vectis: VectisService;
  account: VectisAccount;
  isWalletConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const VectisContext = createContext<VectisState | null>(null);

export const VectisProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [vectisService, setVectisService] = useState<VectisService | null>(null);
  const [userAddresses, setUserAddresses] = useState<string[]>([]);
  const [chainName, setChain] = useState<string>(chainNames[0]);
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

  const buildTxService = async () => {
    const addresses = getContractAddresses(chainName as string);
    console.log(chainName);
    const signer = await getOfflineSignerDirect();
    const txService = await VectisService.connectWithSigner(signer, { endpoints, defaultFee, addresses });
    setVectisService(txService);
  };

  const { data: account } = useQuery<VectisAccount>(
    ['vectis_account', query.vectis],
    () => vectisService!.getAccountInfo(query.vectis as string, chainName as string),
    {
      enabled: Boolean(vectisService) && Boolean(chainName) && Boolean(query.vectis)
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

  useEffect(() => {
    const addresses = getContractAddresses(chainName as string);
    if (isWalletConnected) buildTxService();
  }, [chainName]);

  useEffect(() => {
    if (!query.vectis) return;
    console.log(query.vectis);
    const [bech32Prefix] = (query.vectis as string).split('1');
    const chain = chains.find((c) => c.bech32_prefix === bech32Prefix);
    // TODO: Throw an error and control it
    if (!chain) return;
    setChain(chain.chain_name);
  }, [query.vectis]);

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
      setUserAddresses(userAddresses);
      await buildTxService();
    }, 200);
  }, [isWalletConnected]);

  return (
    <VectisContext.Provider
      value={
        {
          userAddr: address,
          defaultFee,
          isWalletConnected,
          chainInfo,
          vectis: vectisService,
          chainName,
          setChain,
          userAddresses,
          supportedChains: chainNames,
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
