import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { OfflineSigner } from '@cosmjs/proto-signing';
import { useChain } from '@cosmos-kit/react-lite';
import { useQuery } from '@tanstack/react-query';

import { AssetInfo, getAssetInfo, getDefaultFee } from '~/configs/assets';
import { Chain, chainIds, chains } from '~/configs/chains';
import { getContractAddresses } from '~/configs/contracts';
import { getEndpoints } from '~/configs/endpoints';
import { VectisService } from '~/services/vectis';
import { protectedRoutes } from '~/utils/links';

import Spinner from '~/components/Spinner';

import { CoinInfo, Endpoints, VectisAccount } from '~/interfaces';

export interface VectisState {
  userAddr: string;
  username: string;
  account: VectisAccount;
  accountBalances: AssetInfo[];
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
  const [chain, setChain] = useState<Chain>(chains[0]);

  const { address, username, disconnect, connect, isWalletConnected, chainWallet } = useChain(chain.chain_name);
  const { isReady: isRouterReady, query, pathname } = useRouter();

  const endpoints = useMemo(() => getEndpoints(chain.chain_name), [chain]);

  const defaultFee = useMemo(() => getDefaultFee(chain), [chain]);

  const { isFetched, data: account } = useQuery(
    ['vectis_account', query.vectis],
    () => vectisService?.getAccountInfo(query.vectis as string, chain.chain_name),
    {
      enabled: isRouterReady && isReady && Boolean(query.vectis)
    }
  );

  const { data: balances } = useQuery(
    ['vectis_account_balances', account?.address],
    () => vectisService?.getBalances(account?.address as string),
    {
      enabled: Boolean(account),
      select: (coins) => coins?.map((c) => ({ amount: c.amount, denom: c.denom, ...getAssetInfo(chain, c.denom) })),
      initialData: []
    }
  );

  useEffect(() => {
    if (!isWalletConnected || !isRouterReady) return;
    if (isRouterReady && !isWalletConnected && protectedRoutes.includes(pathname)) {
      connect();
    }
    setTimeout(async () => {
      let chainInfo = chain;
      if (query.vectis) {
        const [bech32Prefix] = (query.vectis as string).split('1');
        const chain = chains.find((c) => c.bech32_prefix === bech32Prefix);
        if (!chain) return;
        chainInfo = chain;
      }
      const signer = await chainWallet?.client.getOfflineSigner?.(chainInfo.chain_id, 'direct');

      const [{ address }] = await signer!.getAccounts();
      if (vectisService?.chainName === chainInfo.chain_name && vectisService.userAddr === address) return;

      const vectis = await VectisService.connectWithSigner(signer as OfflineSigner, {
        addresses: getContractAddresses(chainInfo.chain_name),
        endpoints: getEndpoints(chainInfo.chain_name),
        defaultFee: getDefaultFee(chainInfo),
        chainName: chainInfo.chain_name
      });

      setVectisService(vectis);
      setChain(chainInfo);
      setIsReady(true);
    }, 200);
  }, [isWalletConnected, isRouterReady, query.vectis, chain]);

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
    console.log(account, userAccounts);
    return <p>Not your account</p>;
  }

  return (
    <VectisContext.Provider
      value={{
        userAddr: address as string,
        username: username as string,
        account: account as VectisAccount,
        accountBalances: balances as AssetInfo[],
        userAccounts,
        endpoints,
        defaultFee,
        chain,
        chains,
        chainName: chain.chain_name,
        setChain: (chainName: string) => setChain(chains.find((c) => c.chain_name === chainName) as Chain),
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
