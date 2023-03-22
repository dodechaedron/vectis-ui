import React, { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useCosmos } from "./CosmWasmProvider";
import { Claim } from "@vectis/types/Cw20Stake.types";
import { TokenInfoResponse } from "@vectis/types/Govec.types";
import { Config, ProposalResponse } from "@vectis/types/DaoProposalSingle.types";
import { Config as PreProposalConfig } from "@vectis/types/DaoPreProposeApprovalSingel.types";
import { Config as Cw20StakedConfig } from "@vectis/types/Cw20Stake.types";

interface DaoContextState extends DaoInfo, Balances {
  tokenInfo: TokenInfoResponse;
  totalStakedPercent: number;
  proposals: ProposalResponse[];
}

interface DaoInfo {
  tokenInfo: TokenInfoResponse;
  totalStaked: string;
  config: Config;
  preProposalConfig: PreProposalConfig;
  cw20StakedConfig: Cw20StakedConfig;
}

interface Balances {
  balance: string;
  stakedBalance: string;
  claims: Claim[];
}

const DaoContext = createContext<DaoContextState | null>(null);

export const DaoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { address, daoQueryService } = useCosmos();
  const [daoInfo, setDaoInfo] = useReducer((state: DaoInfo | {}, newState: Partial<DaoInfo>) => ({ ...state, ...newState }), {
    totalStaked: "0",
  });

  const [balances, setBalances] = useReducer((state: Balances, newState: Partial<Balances>) => ({ ...state, ...newState }), {
    balance: "0",
    stakedBalance: "0",
    claims: [],
  });

  const [proposals, setProposals] = useState<ProposalResponse[]>([]);

  const totalStakedPercent = useMemo(() => {
    if (!daoInfo.totalStaked || !daoInfo.tokenInfo?.total_supply) return 0;
    return (Number(daoInfo.totalStaked) / Number(daoInfo.tokenInfo?.total_supply)) * 100;
  }, [daoInfo, balances]);

  const refreshBalances = useCallback(async () => {
    if (!address || !daoQueryService) return;
    const balance = await daoQueryService.getUserBalance(address);
    const stakedBalance = await daoQueryService.getUserStakedBalance(address);
    const claims = await daoQueryService.getUserClaims(address);
    setBalances({ balance, stakedBalance, claims });
  }, [address, daoQueryService]);

  const getProposals = useCallback(
    async (limit = 10, offset = 0) => {
      if (!daoQueryService) return;
      const proposals = await daoQueryService.getProposals(limit, offset);
      setProposals(proposals);
    },
    [daoQueryService]
  );

  useEffect(() => {
    if (!daoQueryService) return;
    const getDaoInfo = async () => {
      const tokenInfo = await daoQueryService.getTokenInfo();
      const totalStaked = await daoQueryService.getTotalStaked();
      const config = await daoQueryService.getConfig();
      const preProposalConfig = await daoQueryService.getPreProposalConfig();
      const cw20StakedConfig = await daoQueryService.getCw20StakedConfig();
      setDaoInfo({ tokenInfo, totalStaked, config, preProposalConfig, cw20StakedConfig });
    };
    getDaoInfo();
    refreshBalances();
    getProposals();
  }, [address, daoQueryService]);

  return (
    <DaoContext.Provider
      value={
        {
          ...balances,
          ...daoInfo,
          totalStakedPercent,
          proposals,
        } as DaoContextState
      }
    >
      {children}
    </DaoContext.Provider>
  );
};

export const useDao = () => {
  const context = React.useContext(DaoContext);
  if (!context) throw new Error("Dao Context Provider is not instanced");
  return context;
};
