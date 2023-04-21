import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { isPast } from 'date-fns';
import { useLocalStorage } from 'react-use';

import { StdSignature } from '@cosmjs/amino';
import { Coin } from '@cosmjs/proto-signing';
import { cosmos, cosmosProvider, isInstalled } from '@vectis/extension-client';

import networkConfig from '~/configs/networks';
import { waitForDocument } from '~/services/browser';
import { connectKeplr, getKeplrSignArbitrary, getKey as getKeplrKey, getSigner as getKeplrSigner, isKeplrInstalled } from '~/services/keplr';
import { VectisQueryService, VectisService } from '~/services/vectis';
import { makeADR036AminoDoc, verifyArbitrary } from '~/utils/crypto';

import { VectisAccount } from '~/interfaces';
import { Network } from '~/interfaces/network';
import { Key } from '@keplr-wallet/types';

export interface VectisState {
  userAddr: string;
  keyDetails: Key;
  network: Network;
  queryClient: VectisQueryService;
  signingClient: VectisService;
  isReady: boolean;
  account: VectisAccount;
  balance: Coin;
  balances: Coin[];
  changeAccount: (wallet: VectisAccount) => void;
  updateBalances: () => Promise<void>;
  connectWallet: () => void;
  disconnect: () => void;
}

const VectisContext = createContext<VectisState | null>(null);

export const VectisProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [session, setSession] = useLocalStorage<{ message: string; signature: string; chainId: string } | null>('session');
  const [balance, updateBalance] = useReducer((prevState, state) => ({ ...prevState, ...state }), {
    balance: { amount: 0, denom: networkConfig.feeToken },
    balances: []
  });
  const [keyDetails, setKeyDetails] = useState<Key | any | null>(null);
  const [signingClient, setSigningClient] = useState<VectisService | null>(null);
  const [queryClient, setQueryClient] = useState<VectisQueryService | null>(null);
  const [account, changeAccount] = useLocalStorage<VectisAccount>('account');

  const [network, setNetwork] = useState<Network | null>(null);

  useEffect(() => {
    const onAccountChange = () => {
      disconnect();
      setTimeout(() => connectWallet, 2000);
    };
    const loadWallet = async () => {
      await waitForDocument();
      await connectWallet();
      if ((session as unknown as { allowConnection: boolean })?.hasOwnProperty('allowConnection')) setSession(null);
      window.addEventListener('keplr_keystorechange', onAccountChange);
      cosmosProvider.onAccountChange(onAccountChange);
    };
    loadWallet().then(() => setIsReady(true));
    return () => {
      window.removeEventListener('keplr_keystorechange', onAccountChange);
      cosmosProvider.offAccountChange(onAccountChange);
    };
  }, []);

  useEffect(() => {
    setNetwork(networkConfig);
    VectisQueryService.connect().then(setQueryClient);
  }, [networkConfig]);

  useEffect(() => {
    updateBalances();
  }, [account, network, queryClient]);

  const connectWallet = async () => {
    try {
      const { signer, key, signArbitry } = await getSigner();
      const client = await VectisService.connectWithSigner(signer);
      const [{ address, pubkey }] = await signer.getAccounts();

      /* Handle Session */
      const userSession = session ? JSON.parse(session.message) : { exp: new Date(0).getTime() };

      if (isPast(userSession.exp)) {
        const message = JSON.stringify({
          action: 'sign/VectisDashboard',
          address,
          exp: new Date().getTime() + 1000 * 60 * 60 * 1
        });
        const { signature, chainId } = (await signArbitry?.(networkConfig.chainId, address, message)) as StdSignature & { chainId: string };
        await verifyArbitrary(message, pubkey, signature, address, chainId);
        setSession({ message, signature, chainId });
      } else {
        if (!session) throw new Error('No session found');
        await verifyArbitrary(session.message, pubkey, session.signature, address, session.chainId);
      }
      /* End Handle Session */

      setKeyDetails(key!);
      setAddress(address);
      setSigningClient(client);
    } catch (error) {
      /* 
      setError(error); */
      console.log(error);
    }
  };

  const updateBalances = useCallback(async () => {
    if (!queryClient || !account || !network) return;
    const balance = await queryClient.getBalance(account.address, network.feeToken);
    const balances = await queryClient.getBalances(account.address);
    updateBalance({ balance, balances });
  }, [queryClient, account, network]);

  const getSigner = useCallback(async () => {
    const isVectisInstalled = isInstalled();
    if (isVectisInstalled) {
      const provider = await cosmos();
      const isSupported = await provider.isChainSupported('uni-6');

      if (!isSupported) {
        await provider.suggestChains([
          {
            chainId: 'uni-6',
            chainName: 'junotestnet',
            prettyName: 'Juno Testnet (uni-6)',
            bech32Prefix: 'juno',
            rpcUrl: 'https://uni-rpc.reece.sh/',
            httpUrl: 'https://uni-api.reece.sh/',
            bip44: { coinType: 118 },
            defaultFeeToken: 'ujunox',
            feeTokens: [{ denom: 'ujunox', coinDecimals: 6 }],
            stakingToken: 'ujunox',
            defaultGasPrice: 0.025,
            gasPriceStep: { low: 0.01, average: 0.025, high: 0.05 }
          } as any
        ]);
      }

      await provider.enable(networkConfig.chainId);
      const signer = await provider.getOfflineSigner(networkConfig.chainId);
      const key = await provider.getKey(networkConfig.chainId);

      const signArbitry = async (chainId: string, signer: string, data: string | Uint8Array): Promise<StdSignature & { chainId: string }> => {
        const { signature } = await provider.signAmino(signer, makeADR036AminoDoc(data as string, signer, chainId));
        return { ...signature, chainId };
      };

      return {
        signer,
        key,
        signArbitry
      };
    } else if (isKeplrInstalled()) {
      await connectKeplr();
      const signer = await getKeplrSigner();
      const key = await getKeplrKey();
      const signArbitry = getKeplrSignArbitrary();
      return { signer, key, signArbitry };
    }
    throw new Error("We couldn't find a wallet extension compatible with Vectis, please install Keplr or Vectis");
  }, []);

  const disconnect = useCallback(() => {
    setSession(null);
    setAddress(null);
    setKeyDetails(null);
    setSigningClient(null);
  }, []);

  return (
    <VectisContext.Provider
      value={
        {
          userAddr: address,
          signingClient,
          queryClient,
          keyDetails,
          network,
          account,
          isReady,
          ...balance,
          updateBalances,
          changeAccount,
          connectWallet,
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
