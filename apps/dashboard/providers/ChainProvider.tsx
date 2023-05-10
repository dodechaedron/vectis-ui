import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { OfflineSigner } from '@cosmjs/proto-signing';
import { wallets as keplrWallet } from '@cosmos-kit/keplr-extension';
import { ChainProvider as CosmosKitChainProvider, useChain } from '@cosmos-kit/react-lite';
import { wallets as vectisWallet } from '@cosmos-kit/vectis-extension';

import assets from '~/configs/assets';
import { chainIds, chainNames, chains } from '~/configs/chains';
import { getEndpoints } from '~/configs/endpoints';

import ModalWallet from '~/components/Modals/WalletModal';

import { CoinInfo, Endpoints } from '~/interfaces';
import { Chain } from '@chain-registry/types';

export interface ChainContextState {
  userAddr: string;
  username: string;
  defaultFee: CoinInfo;
  chain: Chain;
  endpoints: Endpoints;
  chainName: string;
  getOfflineSigner: () => OfflineSigner | Promise<OfflineSigner>;
  userAccounts: string[];
  setChain: (chainName: string) => void;
  isWalletConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const ChainContext = createContext<ChainContextState | null>(null);

const WrapperChainProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userAccounts, setUserAccounts] = useState<string[]>([]);
  const [chainName, setChain] = useState<string>(chainNames[0]);
  const {
    address: userAddr,
    username,
    chain,
    assets,
    disconnect,
    getOfflineSigner,
    connect,
    isWalletConnected,
    chainWallet
  } = useChain(chainName as string);

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

  useEffect(() => {
    if (!isWalletConnected || !chainWallet?.client) return;
    setTimeout(async () => {
      for (const chain of chains) {
        await chainWallet.client.addChain?.({ chain, name: chain.chain_name, assetList: chain.assets });
      }
      await chainWallet.client.enable?.(chainIds);
      const accounts = await Promise.all(
        chainIds.map(async (chain) => {
          const account = await chainWallet.client.getAccount?.(chain);
          return account?.address as string;
        })
      );
      setUserAccounts(accounts);
    }, 200);
  }, [isWalletConnected]);

  return (
    <ChainContext.Provider
      value={{
        chain: chain as Chain,
        chainName,
        userAddr: userAddr as string,
        username: username as string,
        endpoints,
        userAccounts,
        connect,
        disconnect,
        defaultFee,
        isWalletConnected,
        getOfflineSigner,
        setChain
      }}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const ChainProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <CosmosKitChainProvider
      assetLists={assets}
      chains={chains}
      walletModal={(props) => <ModalWallet {...props} />}
      wallets={[...keplrWallet, ...vectisWallet]}
    >
      <WrapperChainProvider>{children}</WrapperChainProvider>
    </CosmosKitChainProvider>
  );
};

export const useChainContext = () => {
  const context = React.useContext(ChainContext);
  if (!context) {
    throw new Error('useChainContext must be used within a ChainProvider');
  }
  return context;
};
