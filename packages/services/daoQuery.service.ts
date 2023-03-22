import { CosmWasmClient, setupWasmExtension, WasmExtension } from "@cosmjs/cosmwasm-stargate";
import {
  BankExtension,
  DistributionExtension,
  QueryClient,
  setupBankExtension,
  setupDistributionExtension,
  setupStakingExtension,
  setupTxExtension,
  StakingExtension,
  TxExtension,
} from "@cosmjs/stargate";
import { HttpBatchClient, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GovecQueryClient } from "@vectis/types";
import { TokenInfoResponse } from "@vectis/types/Govec.types";
import { Cw20StakeQueryClient } from "@vectis/types/Cw20Stake.client";
import { Claim } from "@vectis/types/Cw20Stake.types";
import { DaoProposalSingleQueryClient } from "@vectis/types/DaoProposalSingle.client";
import { DaoPreProposeApprovalSingelQueryClient } from "@vectis/types/DaoPreProposeApprovalSingel.client";
import { Config, ProposalResponse, VoteInfo } from "@vectis/types/DaoProposalSingle.types";
import { Config as PreProposalConfig } from "@vectis/types/DaoPreProposeApprovalSingel.types";
import { Config as Cw20StakedConfig } from "@vectis/types/Cw20Stake.types";

export class DAOQueryService {
  queryClient: QueryClient & StakingExtension & BankExtension & TxExtension & DistributionExtension & WasmExtension;
  constructor(
    readonly client: Tendermint34Client,
    readonly govecClient: GovecQueryClient,
    readonly cw20StakeClient: Cw20StakeQueryClient,
    readonly proposalClient: DaoProposalSingleQueryClient,
    readonly preProposalClient: DaoPreProposeApprovalSingelQueryClient
  ) {
    this.queryClient = QueryClient.withExtensions(
      client,
      setupStakingExtension,
      setupBankExtension,
      setupWasmExtension,
      setupTxExtension,
      setupDistributionExtension
    );
  }

  static async getTmClient(rpcUrl: string): Promise<Tendermint34Client> {
    const httpClient = new HttpBatchClient(rpcUrl, { batchSizeLimit: 10 });
    return await Tendermint34Client.create(httpClient);
  }

  static async connect(
    rpcUrl: string,
    addresses: { daoAddr: string; govecAddr: string; stakingAddr: string; proposalAddr: string; preProposalAddr: string }
  ): Promise<DAOQueryService> {
    const tmClient = await this.getTmClient(rpcUrl);
    // @ts-ignore
    const cosmwasmClient = await CosmWasmClient.connect(rpcUrl);
    const govecClient = new GovecQueryClient(cosmwasmClient, addresses.govecAddr);
    const cw20StakeClient = new Cw20StakeQueryClient(cosmwasmClient, addresses.stakingAddr);
    const proposalClient = new DaoProposalSingleQueryClient(cosmwasmClient, addresses.proposalAddr);
    const preProposalClient = new DaoPreProposeApprovalSingelQueryClient(cosmwasmClient, addresses.preProposalAddr);
    return new DAOQueryService(tmClient, govecClient, cw20StakeClient, proposalClient, preProposalClient);
  }

  async getTokenInfo(): Promise<TokenInfoResponse> {
    return await this.govecClient.tokenInfo();
  }

  async getUserStakedBalance(address: string): Promise<string> {
    const { value } = await this.cw20StakeClient.stakedValue({ address });
    return value;
  }

  async getUserBalance(address: string): Promise<string> {
    const { balance } = await this.govecClient.balance({ address });
    return balance;
  }

  async getUserClaims(address: string): Promise<Claim[]> {
    const { claims } = await this.cw20StakeClient.claims({ address });
    return claims;
  }

  async getUserVote(voter: string, proposalId: string): Promise<VoteInfo | null> {
    const { vote } = await this.proposalClient.getVote({ proposalId: Number(proposalId), voter });
    return vote ?? null;
  }

  async getProposals(limit = 10, startBefore = 0): Promise<ProposalResponse[]> {
    const { proposals } = await this.proposalClient.reverseProposals({ limit, startBefore });
    return proposals;
  }

  async getConfig(): Promise<Config> {
    return await this.proposalClient.config();
  }

  async getPreProposalConfig(): Promise<PreProposalConfig> {
    return await this.preProposalClient.config();
  }

  async getTotalStaked(): Promise<string> {
    const { total } = await this.cw20StakeClient.totalStakedAtHeight({});
    return total;
  }

  async getCw20StakedConfig(): Promise<Cw20StakedConfig> {
    return await this.cw20StakeClient.getConfig();
  }
}
