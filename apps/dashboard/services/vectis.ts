import network from 'configs/networks';
import axios from 'redaxios';
import { coin, convertMicroDenomToDenom } from 'utils/conversion';

import { ExecuteResult, setupWasmExtension, SigningCosmWasmClient, WasmExtension } from '@cosmjs/cosmwasm-stargate';
import { fromBase64, toBase64, toUtf8 } from '@cosmjs/encoding';
import { Coin, OfflineSigner } from '@cosmjs/proto-signing';
import {
  BankExtension,
  DistributionExtension,
  GasPrice,
  QueryClient,
  setupBankExtension,
  setupDistributionExtension,
  setupStakingExtension,
  setupTxExtension,
  StakingExtension,
  TxExtension
} from '@cosmjs/stargate';
import { HttpBatchClient, Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { VectisAccount } from 'interfaces';
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1';
import { VoteInfo } from '@dao-dao/types/contracts/DaoProposalSingle.common';
import { FactoryT, ProxyT } from '@vectis/types';

const factoryContractAddress = process.env.NEXT_PUBLIC_CONTRACT_FACTORY_ADDRESS;

export class VectisQueryService {
  queryClient: QueryClient & StakingExtension & BankExtension & TxExtension & DistributionExtension & WasmExtension;
  http: typeof axios;
  constructor(readonly client: Tendermint34Client) {
    this.client = client;
    this.http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_INDEXER_URL
    });
    this.queryClient = QueryClient.withExtensions(
      client,
      setupStakingExtension,
      setupBankExtension,
      setupTxExtension,
      setupWasmExtension,
      setupDistributionExtension
    );
  }

  static async getTmClient(): Promise<Tendermint34Client> {
    const httpClient = new HttpBatchClient(network.rpcUrl, { batchSizeLimit: 10 });
    return await Tendermint34Client.create(httpClient);
  }

  static async connect(): Promise<VectisQueryService> {
    const tmClient = await this.getTmClient();
    return new VectisQueryService(tmClient);
  }

  async getAccountsByPubkey(pubKey: string): Promise<VectisAccount[]> {
    const { data } = await this.http.get(`/auth/global/accounts/${pubKey}`);
    return data;
  }

  async getAccountsByGuardianAddr(chainName: string, guardianAddr: string): Promise<VectisAccount[]> {
    const { data } = await this.http.get(`/guardian/${chainName}/vectis_accounts_by_guardian/${guardianAddr}`);
    return data;
  }

  async getActiveGuardianRequests(proxyAddr: string): Promise<any> {
    return await this.queryClient.wasm.queryContractSmart(proxyAddr, { guardians_update_request: {} });
  }

  async getGuardianGroupByWalletAddr(addr: string): Promise<any> {}

  async getAccountInfo(proxyAddr: string): Promise<VectisAccount> {
    const { data } = await this.http.get(`/auth/junotestnet/accounts/${proxyAddr}`);
    return data;
  }

  async getFees(): Promise<FactoryT.FeesResponse> {
    return await this.queryClient.wasm.queryContractSmart(factoryContractAddress, { fees: {} });
  }

  async getBalances(address: string): Promise<Coin[]> {
    const balances = await this.queryClient.bank.allBalances(address);
    return balances;
  }

  async getBalance(address: string, denom: string): Promise<Coin> {
    const balance = await this.queryClient.bank.balance(address, denom);
    return balance;
  }

  async getProposalVoteList(multisigAddress: string, proposalId: number): Promise<VoteInfo[]> {
    const { votes } = await this.queryClient.wasm.queryContractSmart(multisigAddress, { list_votes: { proposal_id: proposalId } });
    return votes;
  }

  async getProposals(multisigAddress: string): Promise<Proposal[]> {
    const queryProps = { reverse_proposals: { limit: 5 } };
    const { proposals } = await this.queryClient.wasm.queryContractSmart(multisigAddress, queryProps);
    return proposals;
  }

  async getThreshold(multisigAddress: string): Promise<{ absolute_count: { weight: number; total_weight: number } }> {
    const queryProps = { threshold: {} };
    return await this.queryClient.wasm.queryContractSmart(multisigAddress, queryProps);
  }

  async getTransactionHistory(address: string, page: number, limit: number): Promise<any> {
    const order = 'ORDER_BY_DESC';
    const receive = await fetch(
      `${network.httpUrl}/cosmos/tx/v1beta1/txs?events=execute._contract_address='${address}'&pagination.limit=${limit}&pagination.offset=${
        (page - 1) * limit
      }&order_by=${order}`
    );
    const { txs, pagination, tx_responses } = await receive.json();

    const decodedTxs = txs.map((tx: any, i: number) => {
      const fee = tx.auth_info.fee.amount[0];
      const txHash = tx_responses[i].txhash;
      const timestamp = tx_responses[i].timestamp;
      const funds = tx.body.messages[0].funds;
      const [type] = Object.keys(tx.body.messages[0].msg);
      const target = '-';
      return { fee, txHash, timestamp, funds, type: type.replace(/_/g, ' '), target };
    });
    /*  const dm = await this.client.txSearchAll({ query: `message.module='wasm' AND message.action='/cosmwasm.wasm.v1.MsgExecuteContract' AND execute._contract_address='${address}'`, page: 1, per_page: 20 })
    const wt = dm.txs.map(d => Tx.decode(d.tx)); */

    return { txs: decodedTxs, pagination };
  }

  async getTest(address: string) {
    const resp = await this.queryClient.wasm.queryContractSmart(address, { plugins: {} });
    console.log(resp);
  }

  async getAllocation(proxyAddress: string) {
    const available = await this.queryClient.bank.balance(proxyAddress, network.feeToken);
    const rewards = await this.queryClient.distribution.delegationTotalRewards(proxyAddress);
    const bonded = await this.queryClient.staking.delegatorDelegations(proxyAddress);
    const unbounded = 0;

    return { available: convertMicroDenomToDenom(available.amount), rewards: 0, bonded: 0, unbounded };
  }
}

export class VectisService extends VectisQueryService {
  constructor(readonly client: Tendermint34Client, readonly signingClient: SigningCosmWasmClient, readonly userAddr: string) {
    super(client);
  }
  static async connectWithSigner(signer: OfflineSigner): Promise<VectisService> {
    const tmClient = await this.getTmClient();
    const [{ address }] = await signer.getAccounts();
    const signingClient = await SigningCosmWasmClient.connectWithSigner(network.rpcUrl, signer, {
      prefix: network.addressPrefix,
      gasPrice: GasPrice.fromString(`${network.gasPrice}${network.feeToken}`)
    });
    return new VectisService(tmClient, signingClient, address);
  }

  async createProxyWallet(
    label: string,
    guardians: string[],
    relayers: string[],
    multisig: boolean,
    initialFunds?: number,
    threshold?: number
  ): Promise<ExecuteResult> {
    const { wallet_fee }: FactoryT.FeesResponse = await this.queryClient.wasm.queryContractSmart(factoryContractAddress, { fees: {} });

    const proxy_initial_funds = initialFunds ? [coin(initialFunds)] : [];
    const m = multisig ? { guardians_multisig: { threshold_absolute_count: threshold || 1, multisig_initial_funds: [] } } : {};

    const create_wallet_msg: FactoryT.CreateWalletMsg = {
      label,
      relayers,
      controller_addr: this.userAddr,
      guardians: {
        addresses: guardians,
        ...m
      },
      proxy_initial_funds
    };

    const funds = (initialFunds || 0) + convertMicroDenomToDenom(wallet_fee.amount);

    return await this.signingClient.execute(
      this.userAddr,
      factoryContractAddress,
      { create_wallet: { create_wallet_msg } },
      'auto',
      undefined,
      [coin(funds)]
    );
  }

  async proxyAcceptGuardianRequest(proxyAddr: string): Promise<ExecuteResult> {
    return await this.signingClient.execute(this.userAddr, proxyAddr, { update_guardians: {} }, 'auto');
  }

  async proxyRejectGuardianRequest(proxyAddr: string): Promise<ExecuteResult> {
    return await this.signingClient.execute(this.userAddr, proxyAddr, { request_update_guardians: { request: null } }, 'auto');
  }

  async proxyUpdateLabel(proxyAddr: string, newLabel: string): Promise<ExecuteResult> {
    const msg = { update_label: { new_label: newLabel } } as ProxyT.ExecuteMsg;
    return await this.signingClient.execute(this.userAddr, proxyAddr, msg, 'auto');
  }

  async voteProposal(multisigAddress: string, proposalId: number, vote: 'yes' | 'no'): Promise<ExecuteResult> {
    return await this.signingClient.execute(this.userAddr, multisigAddress, { vote: { proposal_id: proposalId, vote } }, 'auto');
  }

  async executeProposal(multisigAddress: string, proposalId: number): Promise<ExecuteResult> {
    const execute = {
      execute: {
        proposal_id: proposalId
      }
    };
    return await this.signingClient.execute(this.userAddr, multisigAddress, execute, 'auto');
  }

  async proxyExecute(proxyAddr: string, msgs: ProxyT.CosmosMsgForEmpty[], memo?: string): Promise<ExecuteResult> {
    const msg = { execute: { msgs } } as ProxyT.ExecuteMsg;
    return await this.signingClient.execute(this.userAddr, proxyAddr, msg, 'auto', memo);
  }

  async proxyRequestUpdateGuardians(proxyAddr: string, newGuardians: string[], threshold?: number): Promise<ExecuteResult> {
    const multisig = threshold ? { guardians_multisig: { threshold_absolute_count: threshold, multisig_initial_funds: [] } } : {};

    return await this.signingClient.execute(
      this.userAddr,
      proxyAddr,
      {
        request_update_guardians: {
          request: {
            guardians: {
              addresses: newGuardians,
              ...multisig
            }
          }
        }
      },
      'auto'
    );
  }

  async proxyTransfer(proxyWalletAddress: string, toAddress: string, amount: number, memo?: string): Promise<ExecuteResult> {
    return await this.proxyExecute(
      proxyWalletAddress,
      [
        {
          bank: {
            send: {
              to_address: toAddress,
              amount: [coin(amount)]
            }
          }
        }
      ],
      memo
    );
  }

  async updateFreezeStatus(proxyWalletAddress: string): Promise<ExecuteResult> {
    return this.signingClient.execute(
      this.userAddr,
      proxyWalletAddress,
      {
        revert_freeze_status: {}
      },
      'auto'
    );
  }

  async updateControllerAddr(proxyWalletAddress: string, newControllerAddress: string): Promise<ExecuteResult> {
    return await this.signingClient.execute(
      this.userAddr,
      proxyWalletAddress,
      {
        rotate_controller_key: {
          new_controller_address: newControllerAddress
        }
      },
      'auto'
    );
  }

  async proxyAddRelayer(proxyWalletAddress: string, newRelayerAddress: string): Promise<ExecuteResult> {
    return await this.signingClient.execute(
      this.userAddr,
      proxyWalletAddress,
      { add_relayer: { new_relayer_address: newRelayerAddress } },
      'auto'
    );
  }

  async proxyRemoveRelayer(proxyWalletAddress: string, relayerAddress: string): Promise<ExecuteResult> {
    return await this.signingClient.execute(this.userAddr, proxyWalletAddress, { remove_relayer: { relayer_address: relayerAddress } }, 'auto');
  }

  async proxyDelegate(proxyWalletAddress: string, validatorAddress: string, amount: number): Promise<ExecuteResult> {
    const msg: ProxyT.StakingMsg = {
      delegate: {
        validator: validatorAddress,
        amount: coin(amount)
      }
    };
    return await this.proxyExecute(proxyWalletAddress, [{ staking: msg }]);
  }

  async proxyUndelegate(proxyWalletAddress: string, validatorAddress: string, amount: number): Promise<ExecuteResult> {
    const msg: ProxyT.StakingMsg = {
      undelegate: {
        validator: validatorAddress,
        amount: coin(amount)
      }
    };

    return await this.proxyExecute(proxyWalletAddress, [{ staking: msg }]);
  }

  async proxyRedelegate(
    proxyWalletAddress: string,
    srcValidatorAddress: string,
    dstValidatorAddress: string,
    amount: string | number
  ): Promise<ExecuteResult> {
    const msg: ProxyT.StakingMsg = {
      redelegate: {
        dst_validator: dstValidatorAddress,
        src_validator: srcValidatorAddress,
        amount: coin(Number(amount))
      }
    };

    return await this.proxyExecute(proxyWalletAddress, [{ staking: msg }]);
  }

  async proxyClaimRewards(proxyWalletAddress: string, validatorAddress: string): Promise<ExecuteResult> {
    const msg: ProxyT.DistributionMsg = {
      withdraw_delegator_reward: {
        validator: validatorAddress
      }
    };

    return await this.proxyExecute(proxyWalletAddress, [{ distribution: msg }]);
  }

  async proxyProposeFreezeOperation(proxyAddr: string, multisigAddr: string, isFrozen: boolean): Promise<ExecuteResult> {
    const msg: ProxyT.CosmosMsgForEmpty = {
      wasm: {
        execute: {
          contract_addr: proxyAddr,
          msg: toBase64(toUtf8(JSON.stringify({ revert_freeze_status: {} }))),
          funds: []
        }
      }
    };
    const proposal = {
      propose: {
        title: `${isFrozen ? 'Unfreeze' : 'Freeze'} Smart Account`,
        description: isFrozen ? 'Request to unfreeze Smart Account' : 'Request to freeze Smart Account for security reasons',
        msgs: [msg],
        latest: null
      }
    };
    return await this.signingClient.execute(this.userAddr, multisigAddr, proposal, 'auto');
  }

  async proxyProposeRotateOperation(proxyAddr: string, multisigAddr: string, controllerAddr: string): Promise<ExecuteResult> {
    const msg: ProxyT.CosmosMsgForEmpty = {
      wasm: {
        execute: {
          contract_addr: proxyAddr,
          msg: toBase64(
            toUtf8(
              JSON.stringify({
                rotate_controller_key: {
                  new_controller_address: controllerAddr
                }
              })
            )
          ),
          funds: []
        }
      }
    };
    const proposal = {
      propose: {
        title: 'Rotate Controller Address in Smart Account',
        description: `Rotate Smart Account controller address to ${controllerAddr}`,
        msgs: [msg],
        latest: null
      }
    };
    return await this.signingClient.execute(this.userAddr, multisigAddr, proposal, 'auto');
  }

  async mintGovec(): Promise<ExecuteResult> {
    const msg: FactoryT.ExecuteMsg = {
      claim_govec: {}
    };

    return await this.signingClient.execute(this.userAddr, factoryContractAddress, msg, 'auto');
  }
}
