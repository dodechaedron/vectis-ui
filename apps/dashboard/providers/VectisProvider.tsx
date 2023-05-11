import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useChain } from '@cosmos-kit/react-lite';

import { chainIds, chainNames, chains } from '~/configs/chains';
import { getContractAddresses } from '~/configs/contracts';
import { getEndpoints } from '~/configs/endpoints';
import { VectisService } from '~/services/vectis';
import { protectedRoutes } from '~/utils/links';

import Spinner from '~/components/Spinner';

import { CoinInfo, Endpoints, VectisAccount } from '~/interfaces';
import { Chain } from '@chain-registry/types';

export interface VectisState {
  userAddr: string;
  username: string;
  account: VectisAccount;
  userAccounts: string[];
  endpoints: Endpoints;
  defaultFee: CoinInfo;
  chains: Chain[];
  chain: Chain;
  chainName: string;
  setChain: (chainName: string) => void;
  isWalletConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  vectis: VectisService;
}

const VectisContext = createContext<VectisState | null>(null);

export const VectisProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [vectisService, setVectisService] = useState<VectisService | null>(null);
  const [userAccounts, setUserAccounts] = useState<string[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [chainName, setChain] = useState<string>(chainNames[0]);

  const { address, username, chain, assets, disconnect, getOfflineSignerDirect, connect, isWalletConnected, chainWallet } = useChain(
    chainName as string
  );
  const { isReady: isRouterReady, query, pathname } = useRouter();

  const endpoints = useMemo(() => getEndpoints(chainName as string), [chainName]);

  const defaultFee = useMemo(() => {
    const { average_gas_price, denom } = chain.fees!.fee_tokens[0];
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
  }, [chain, assets]);

  const { isFetched, data: account } = useQuery(
    ['vectis_account', query.vectis],
    () => vectisService?.getAccountInfo(query.vectis as string, chainName),
    {
      enabled: isRouterReady && isReady && Boolean(query.vectis)
    }
  );

  useEffect(() => {
    if (!query.vectis) return;
    const [bech32Prefix] = (query.vectis as string).split('1');
    const chain = chains.find((c) => c.bech32_prefix === bech32Prefix);
    // TODO: Throw an error and control it
    if (!chain) return;
    setChain(chain.chain_name);
  }, [query.vectis]);

  useEffect(() => {
    if (!isWalletConnected) return;
    setTimeout(async () => {
      const addresses = getContractAddresses(chainName as string);
      const signer = await getOfflineSignerDirect();
      const vectis = await VectisService.connectWithSigner(signer, { endpoints, defaultFee, addresses });
      setVectisService(vectis);
      setIsReady(true);
    }, 200);
  }, [chainName, isWalletConnected, chainWallet]);

  useEffect(() => {
    if (!isWalletConnected) return;
    setTimeout(async () => {
      for (const chain of chains) {
        await chainWallet?.client.addChain?.({ chain, name: chain.chain_name, assetList: chain.assets });
      }
      await chainWallet?.client.enable?.(chainIds);
      const accounts: string[] = [];
      for (const chainId of chainIds) {
        const account = await chainWallet?.client.getAccount?.(chainId);
        accounts.push(account!.address);
      }
      setUserAccounts(accounts);
    }, 200);
  }, [isWalletConnected, chainWallet]);

  if (protectedRoutes.includes(pathname) && !isFetched) return <Spinner wrapper size="md" />;
  if (protectedRoutes.includes(pathname) && isFetched && !userAccounts.includes(account?.controllerAddr as string)) {
    return <p>Not your account</p>;
  }

  return (
    <VectisContext.Provider
      value={{
        userAddr: address as string,
        username: username as string,
        account: account as VectisAccount,
        userAccounts,
        endpoints,
        defaultFee,
        chain: chain as Chain,
        chains,
        chainName,
        setChain,
        connect,
        disconnect,
        isWalletConnected,
        vectis: vectisService as VectisService
      }}
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
