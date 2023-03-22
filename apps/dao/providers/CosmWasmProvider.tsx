import React, { PropsWithChildren, useEffect, useState } from "react";
import { DAOExecuteService, DAOQueryService } from "@vectis/services";
import { useChainWallet } from "@cosmos-kit/react-lite";

interface CosmWasmState {
  address?: string;
  username?: string;
  daoQueryService: DAOQueryService;
  daoExecuteService?: DAOExecuteService;
  connect: () => void;
  disconnect: () => void;
  contractAddresses: {
    daoAddr: string;
    govecAddr: string;
    stakingAddr: string;
    proposalAddr: string;
    preProposalAddr: string;
  };
}

export const CosmWasmContext = React.createContext<CosmWasmState | null>(null);

export const CosmWasmProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [daoQueryService, setDaoQueryService] = useState<DAOQueryService>();
  const [daoExecuteService, setDaoExecuteService] = useState<DAOExecuteService>();
  const { chain, address, username, connect, disconnect, getOfflineSigner, isWalletConnected } = useChainWallet(
    "junotestnet",
    "vectis-extension"
  );
  const contractAddresses = {
    daoAddr: process.env.NEXT_PUBLIC_DAO_ADDR as string,
    govecAddr: process.env.NEXT_PUBLIC_GOVEC_ADDR as string,
    stakingAddr: process.env.NEXT_PUBLIC_STAKING_ADDR as string,
    proposalAddr: process.env.NEXT_PUBLIC_PROPOSAL_ADDR as string,
    preProposalAddr: process.env.NEXT_PUBLIC_PRE_PROPOSAL_ADDR as string,
  };

  useEffect(() => {
    DAOQueryService.connect(chain.apis!.rpc![0].address, contractAddresses).then(setDaoQueryService);
  }, [DAOQueryService]);

  useEffect(() => {
    if (!isWalletConnected) return;
    const loadDAOExecuteService = async () => {
      try {
        const signer = await getOfflineSigner();
        const daoExecutionService = await DAOExecuteService.connectWithSigner(daoQueryService as DAOQueryService, signer, {
          gasPrice: chain.fees!.fee_tokens![0].average_gas_price!.toString(),
          feeToken: chain.fees!.fee_tokens![0].denom,
          rpcUrl: chain.apis!.rpc![0].address,
        });
        setDaoExecuteService(daoExecutionService);
      } catch (err) {
        console.log(err);
      }
    };
    loadDAOExecuteService();
  }, [address, isWalletConnected]);

  return (
    <CosmWasmContext.Provider
      value={
        {
          address,
          username,
          connect,
          disconnect,
          daoQueryService,
          daoExecuteService,
          contractAddresses,
        } as CosmWasmState
      }
    >
      {children}
    </CosmWasmContext.Provider>
  );
};

export const useCosmos = () => {
  const context = React.useContext(CosmWasmContext);
  if (!context) throw new Error("Wallet Context Provider is not instanced");
  return context;
};

export default CosmWasmProvider;
