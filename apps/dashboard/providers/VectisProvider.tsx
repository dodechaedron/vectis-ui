import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { useChain } from '@cosmos-kit/react-lite';

import { VectisQueryService, VectisService } from '~/services/vectis';
import * as factories from '~/utils/factories';
import * as pluginRegistries from '~/utils/plugin-registry';

import { CoinInfo, VectisAccount } from '~/interfaces';
import { Chain } from '@chain-registry/types';

export interface VectisState {
  userAddr: string;
  defaultFee: CoinInfo;
  chainInfo: Chain;
  chainName: string;
  setChain: (chainName: string) => void;
  supportedChains: string[];
  queryClient: VectisQueryService;
  signingClient: VectisService;
  account: VectisAccount;
  changeAccount: (wallet: VectisAccount) => void;
  connect: () => void;
  disconnect: () => void;
}

const supportedChains = ['junotestnet', 'injectivetestnet'];

const VectisContext = createContext<VectisState | null>(null);

export const VectisProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [signingClient, setSigningClient] = useState<VectisService | null>(null);
  const [queryClient, setQueryClient] = useState<VectisQueryService | null>(null);
  const [account, changeAccount] = useLocalStorage<VectisAccount>('vectis@v1:account');

  const [chainName, setChain] = useLocalStorage<string>('vectis@v1:selectedNetwork', 'junotestnet');
  const {
    address,
    chain: chainInfo,
    assets,
    disconnect,
    getOfflineSignerDirect,
    walletRepo,
    connect,
    isWalletConnected
  } = useChain(chainName as string);
  const addresses = useMemo(
    () => ({
      factoryAddress: factories[`${chainInfo.chain_name}_factory`],
      pluginRegistryAddress: pluginRegistries[`${chainInfo.chain_name}_plugin_registry`]
    }),
    [chainInfo]
  );

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

  const endpoints = useMemo(() => {
    const domain = chainInfo.chain_name.includes('testnet') ? 'testcosmos.directory' : 'cosmos.directory';
    return {
      rpcUrl: `https://rpc.${domain}/${chainInfo.chain_name}`,
      restUrl: `https://rest.${domain}/${chainInfo.chain_name}`,
      grpcUrl: chainInfo.apis!.grpc![0].address
    };
  }, [chainInfo]);

  useEffect(() => {
    VectisQueryService.connect(endpoints, addresses).then(setQueryClient);
  }, [endpoints, addresses]);

  useEffect(() => {
    (async () => {
      if (!isWalletConnected) return;
      if (!address || !address.includes(chainInfo.bech32_prefix)) return;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const signer = await getOfflineSignerDirect();
      VectisService.connectWithSigner(signer, { endpoints, defaultFee, addresses }).then(setSigningClient);
    })();
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
          supportedChains,
          queryClient,
          signingClient,
          account,
          changeAccount,
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
