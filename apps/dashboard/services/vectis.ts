import BigNumber from 'bignumber.js';
import axios from 'redaxios';
import { coin, convertMicroDenomToDenom, toCosmosMsg } from 'utils/conversion';

import { ExecuteResult, setupWasmExtension, SigningCosmWasmClient, WasmExtension } from '@cosmjs/cosmwasm-stargate';
import { toBase64, toUtf8 } from '@cosmjs/encoding';
import { Coin, OfflineDirectSigner } from '@cosmjs/proto-signing';
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

import { parseCredPubKey } from '~/utils/misc';

import InjectiveClient from './injective';

import { CoinInfo, ContractAddresses, Endpoints, VectisAccount } from '~/interfaces';
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1';
import { VoteInfo } from '@dao-dao/types/contracts/DaoProposalSingle.common';
import { FactoryT, ProxyT } from '@vectis/types';
import { Plugin, PluginsResponse } from '@vectis/types/PluginRegistry.types';
import { PluginListResponse } from '@vectis/types/Proxy.types';

export class VectisQueryService {
  query: QueryClient & StakingExtension & BankExtension & TxExtension & DistributionExtension & WasmExtension;
  http: typeof axios;
  constructor(readonly client: Tendermint34Client, readonly endpoints: Endpoints, readonly addresses: ContractAddresses) {
    this.client = client;
    this.http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_INDEXER_URL
    });
    this.query = QueryClient.withExtensions(
      client,
      setupStakingExtension,
      setupBankExtension,
      setupTxExtension,
      setupWasmExtension,
      setupDistributionExtension
    );
  }

  static async getTmClient(rpcUrl: string): Promise<Tendermint34Client> {
    const httpClient = new HttpBatchClient(rpcUrl, { batchSizeLimit: 10 });
    return await Tendermint34Client.create(httpClient);
  }

  static async connect(endpoints: Endpoints, addresses: ContractAddresses): Promise<VectisQueryService> {
    const tmClient = await this.getTmClient(endpoints.rpcUrl);
    return new VectisQueryService(tmClient, endpoints, addresses);
  }

  async getAccounts(controller: string[]): Promise<VectisAccount[]> {
    const { data } = await this.http.get(`/auth/global/accounts/${encodeURI(JSON.stringify(controller))}`);
    return data;
  }

  async getAccountsByGuardianAddr(chainName: string, guardianAddr: string): Promise<VectisAccount[]> {
    const { data } = await this.http.get(`/guardian/${chainName}/vectis_accounts_by_guardian/${guardianAddr}`);
    return data;
  }

  async getPluginsFromRegistry(): Promise<PluginsResponse> {
    return await this.query.wasm.queryContractSmart(this.addresses.pluginRegistryAddress, { get_plugins: {} });
  }

  async getPluginByIdFromRegistry(id: number): Promise<Plugin> {
    return await this.query.wasm.queryContractSmart(this.addresses.pluginRegistryAddress, { get_plugin_by_id: { id } });
  }

  async getActiveGuardianRequests(proxyAddr: string): Promise<any> {
    return await this.query.wasm.queryContractSmart(proxyAddr, { guardians_update_request: {} });
  }

  async getGuardianGroupByWalletAddr(addr: string): Promise<any> {}

  async getAccountInfo(proxyAddr: string, chainName: string): Promise<VectisAccount> {
    const { data } = await this.http.get(`/auth/${chainName}/accounts/${proxyAddr}`);
    return data;
  }

  async getFees(): Promise<FactoryT.FeesResponse> {
    return await this.query.wasm.queryContractSmart(this.addresses.factoryAddress, { fees: {} });
  }

  async getPlugins(proxyAddress: string): Promise<PluginListResponse> {
    const plugins = await this.query.wasm.queryContractSmart(proxyAddress, { plugins: {} });
    return plugins;
  }

  async getBalances(address: string): Promise<Coin[]> {
    const balances = await this.query.bank.allBalances(address);
    return balances;
  }

  async getBalance(address: string, denom: string): Promise<Coin> {
    const balance = await this.query.bank.balance(address, denom);
    return balance;
  }

  async getProposalVoteList(multisigAddress: string, proposalId: number): Promise<VoteInfo[]> {
    const { votes } = await this.query.wasm.queryContractSmart(multisigAddress, { list_votes: { proposal_id: proposalId } });
    return votes;
  }

  async getProposals(multisigAddress: string): Promise<Proposal[]> {
    const queryProps = { reverse_proposals: { limit: 5 } };
    const { proposals } = await this.query.wasm.queryContractSmart(multisigAddress, queryProps);
    return proposals;
  }

  async getThreshold(multisigAddress: string): Promise<{ absolute_count: { weight: number; total_weight: number } }> {
    const queryProps = { threshold: {} };
    return await this.query.wasm.queryContractSmart(multisigAddress, queryProps);
  }

  async getTransactionHistory(address: string, page: number, limit: number): Promise<any> {
    const order = 'ORDER_BY_DESC';
    const receive = await fetch(
      `${
        this.endpoints.restUrl
      }/cosmos/tx/v1beta1/txs?events=execute._contract_address='${address}'&pagination.limit=${limit}&pagination.offset=${
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
    const resp = await this.query.wasm.queryContractSmart(address, { plugins: {} });
    console.log(resp);
  }

  async getAllocation(proxyAddress: string, denom: string) {
    const available = await this.query.bank.balance(proxyAddress, denom);
    const rewards = await this.query.distribution.delegationTotalRewards(proxyAddress);
    const bonded = await this.query.staking.delegatorDelegations(proxyAddress);
    const unbounded = 0;

    return { available: convertMicroDenomToDenom(available.amount), rewards: 0, bonded: 0, unbounded };
  }
}

export class VectisService extends VectisQueryService {
  constructor(
    readonly tmClient: Tendermint34Client,
    readonly tx: {
      execute(
        senderAddress: string,
        contractAddress: string,
        msg: any,
        fee: 'auto' | number,
        memo?: string,
        funds?: readonly Coin[]
      ): Promise<ExecuteResult>;
      sendTokens(
        senderAddress: string,
        recipientAddress: string,
        amount: readonly Coin[],
        fee: 'auto' | number,
        memo?: string
      ): Promise<unknown>;
    },
    readonly userAddr: string,
    readonly endpoints: Endpoints,
    readonly defaultFee: CoinInfo,
    readonly addresses: ContractAddresses
  ) {
    super(tmClient, endpoints, addresses);
  }
  static async connectWithSigner(
    signer: OfflineDirectSigner,
    { endpoints, defaultFee, addresses }: { endpoints: Endpoints; defaultFee: CoinInfo; addresses: ContractAddresses }
  ): Promise<VectisService> {
    const tmClient = await this.getTmClient(endpoints.rpcUrl);
    const [{ address }] = await signer.getAccounts();
    let client;
    if (endpoints.restUrl.includes('injective')) {
      client = new InjectiveClient(signer, endpoints);
    } else {
      client = await SigningCosmWasmClient.connectWithSigner(endpoints.rpcUrl, signer, {
        gasPrice: GasPrice.fromString(`${defaultFee.averageGasPrice}${defaultFee.udenom}`)
      });
    }
    return new VectisService(tmClient, client, address, endpoints, defaultFee, addresses);
  }

  async createProxyWallet(
    label: string,
    guardians: string[],
    relayers: string[],
    multisig: boolean,
    initialFunds?: number,
    threshold?: number
  ): Promise<ExecuteResult> {
    const { wallet_fee }: FactoryT.FeesResponse = await this.query.wasm.queryContractSmart(this.addresses.factoryAddress, { fees: {} });

    const proxy_initial_funds = initialFunds ? [coin(initialFunds, this.defaultFee.udenom)] : [];
    const m = multisig ? { guardians_multisig: { threshold_absolute_count: threshold || 1 } } : {};

    const create_wallet_msg = {
      label,
      relayers,
      controller_addr: this.userAddr,
      guardians: {
        addresses: guardians,
        ...m
      },
      proxy_initial_funds
    };

    const funds = BigNumber(Number(initialFunds || 0))
      .plus(BigNumber(Number(wallet_fee.amount)))
      .toString();

    return await this.tx.execute(this.userAddr, this.addresses.factoryAddress, { create_wallet: { create_wallet_msg } }, 'auto', undefined, [
      coin(funds, this.defaultFee.udenom)
    ]);
  }

  async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    amount: readonly Coin[],
    fee: 'auto' | number,
    memo?: string
  ): Promise<unknown> {
    return await this.tx.sendTokens(senderAddress, recipientAddress, amount, fee, memo);
  }

  async instantiatePlugin(
    proxyAddr: string,
    codeId: number,
    instantiateMsg: any,
    pluginParams: any,
    label = 'Vectis Plugin',
    memo?: string,
    funds?: Coin[]
  ): Promise<void> {
    const installPluginMsg = {
      instantiate_plugin: {
        instantiate_msg: toCosmosMsg(instantiateMsg),
        plugin_params: pluginParams,
        label,
        src: { code_id: codeId }
      }
    };

    await this.tx.execute(this.userAddr, proxyAddr, installPluginMsg, 'auto', memo, funds);
  }

  async instantiateIdentityPlugin(proxyAddr: string): Promise<void> {
    const { data } = await axios.post(`https://api-testnet.avida.zone/rg-holder-setup/${this.userAddr}/${proxyAddr}`);

    const subPR = JSON.parse(data);
    const cred_def = parseCredPubKey(JSON.stringify(subPR.credential_pub_key));
    const instMsg = { cred_def };

    const identityPlugin = await this.getPluginByIdFromRegistry(1);
    // const codeId = identityPlugin.versions[identityPlugin.latest_version].code_id;

    await this.instantiatePlugin(
      proxyAddr,
      991,
      instMsg,
      { permissions: [{ query: 'anoncreds-pubkey' }] },
      'Vectis Identity Plugin',
      undefined,
      [coin(10, this.defaultFee.udenom)]
    );
  }

  async proxyAcceptGuardianRequest(proxyAddr: string): Promise<ExecuteResult> {
    return await this.tx.execute(this.userAddr, proxyAddr, { update_guardians: {} }, 'auto');
  }

  async proxyRejectGuardianRequest(proxyAddr: string): Promise<ExecuteResult> {
    return await this.tx.execute(this.userAddr, proxyAddr, { request_update_guardians: { request: null } }, 'auto');
  }

  async proxyUpdateLabel(proxyAddr: string, newLabel: string): Promise<ExecuteResult> {
    const msg = { update_label: { new_label: newLabel } } as ProxyT.ExecuteMsg;
    return await this.tx.execute(this.userAddr, proxyAddr, msg, 'auto');
  }

  async voteProposal(multisigAddress: string, proposalId: number, vote: 'yes' | 'no'): Promise<ExecuteResult> {
    return await this.tx.execute(this.userAddr, multisigAddress, { vote: { proposal_id: proposalId, vote } }, 'auto');
  }

  async executeProposal(multisigAddress: string, proposalId: number): Promise<ExecuteResult> {
    const execute = {
      execute: {
        proposal_id: proposalId
      }
    };
    return await this.tx.execute(this.userAddr, multisigAddress, execute, 'auto');
  }

  async proxyExecute(proxyAddr: string, msgs: ProxyT.CosmosMsgForEmpty[], memo?: string): Promise<ExecuteResult> {
    const msg = { execute: { msgs } } as ProxyT.ExecuteMsg;
    return await this.tx.execute(this.userAddr, proxyAddr, msg, 'auto', memo);
  }

  async proxyRequestUpdateGuardians(proxyAddr: string, newGuardians: string[], threshold?: number): Promise<ExecuteResult> {
    const multisig = threshold ? { guardians_multisig: { threshold_absolute_count: threshold, multisig_initial_funds: [] } } : {};

    return await this.tx.execute(
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
              amount: [coin(amount, this.defaultFee.udenom)]
            }
          }
        }
      ],
      memo
    );
  }

  async updateFreezeStatus(proxyWalletAddress: string): Promise<ExecuteResult> {
    return this.tx.execute(
      this.userAddr,
      proxyWalletAddress,
      {
        revert_freeze_status: {}
      },
      'auto'
    );
  }

  async updateControllerAddr(proxyWalletAddress: string, newControllerAddress: string): Promise<ExecuteResult> {
    return await this.tx.execute(
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
    return await this.tx.execute(this.userAddr, proxyWalletAddress, { add_relayer: { new_relayer_address: newRelayerAddress } }, 'auto');
  }

  async proxyRemoveRelayer(proxyWalletAddress: string, relayerAddress: string): Promise<ExecuteResult> {
    return await this.tx.execute(this.userAddr, proxyWalletAddress, { remove_relayer: { relayer_address: relayerAddress } }, 'auto');
  }

  async proxyDelegate(proxyWalletAddress: string, validatorAddress: string, amount: number): Promise<ExecuteResult> {
    const msg: ProxyT.StakingMsg = {
      delegate: {
        validator: validatorAddress,
        amount: coin(amount, this.defaultFee.udenom)
      }
    };
    return await this.proxyExecute(proxyWalletAddress, [{ staking: msg }]);
  }

  async proxyUndelegate(proxyWalletAddress: string, validatorAddress: string, amount: number): Promise<ExecuteResult> {
    const msg: ProxyT.StakingMsg = {
      undelegate: {
        validator: validatorAddress,
        amount: coin(amount, this.defaultFee.udenom)
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
        amount: coin(amount, this.defaultFee.udenom)
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
    return await this.tx.execute(this.userAddr, multisigAddr, proposal, 'auto');
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
    return await this.tx.execute(this.userAddr, multisigAddr, proposal, 'auto');
  }
}
