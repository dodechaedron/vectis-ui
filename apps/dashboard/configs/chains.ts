import { archway_testnet_assets, injective_testnet_assets, juno_assets, juno_testnet_assets, neutron_testnet_assets } from './assets';
import { isTestnet } from './network';

import type { AssetList, Chain as ChainRegistry } from '@chain-registry/types';

export interface Chain extends ChainRegistry {
  assets: AssetList;
}

export type Chains = Chain[];

const junotestnet: Chain = {
  $schema: '../../chain.schema.json',
  chain_name: 'junotestnet',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'Juno Testnet',
  chain_id: 'uni-6',
  bech32_prefix: 'juno',
  daemon_name: 'junod',
  node_home: '$HOME/.juno',
  key_algos: ['secp256k1'],
  slip44: 118,
  assets: juno_testnet_assets,
  fees: {
    fee_tokens: [
      {
        denom: 'ujunox',
        low_gas_price: 0.03,
        average_gas_price: 0.04,
        high_gas_price: 0.05
      }
    ]
  },
  staking: {
    staking_tokens: [
      {
        denom: 'ujunox'
      }
    ]
  },
  codebase: {
    git_repo: 'https://github.com/CosmosContracts/juno',
    recommended_version: 'v14.0.0-alpha.1',
    compatible_versions: ['v14.0.0-alpha.1'],
    cosmos_sdk_version: '0.45',
    consensus: {
      type: 'tendermint',
      version: '0.34'
    },
    cosmwasm_version: '0.30',
    cosmwasm_enabled: true,
    ibc_go_version: '4.3.0',
    genesis: {
      genesis_url: 'https://raw.githubusercontent.com/CosmosContracts/testnets/main/uni-6/genesis.json'
    },
    versions: [
      {
        name: 'v13.0.0-beta.1',
        recommended_version: 'v13.0.0-beta.1',
        compatible_versions: ['v13.0.0-beta.1'],
        cosmos_sdk_version: '0.45',
        consensus: {
          type: 'tendermint',
          version: '0.34'
        },
        cosmwasm_version: '0.30',
        cosmwasm_enabled: true,
        ibc_go_version: '4.3.0'
      },
      {
        name: 'v14.0.0-alpha.1',
        recommended_version: 'v14.0.0-alpha.1',
        compatible_versions: ['v14.0.0-alpha.1'],
        cosmos_sdk_version: '0.45',
        consensus: {
          type: 'tendermint',
          version: '0.34'
        },
        cosmwasm_version: '0.30',
        cosmwasm_enabled: true,
        ibc_go_version: '4.3.0'
      }
    ]
  },
  peers: {
    seeds: [
      {
        id: 'babc3f3f7804933265ec9c40ad94f4da8e9e0017',
        address: 'testnet-seed.rhinostake.com:12656',
        provider: 'RHINO'
      }
    ],
    persistent_peers: [
      {
        id: 'c54bf418fb542634495f57a1e36c9bd057d55e1b',
        address: '5.161.80.115:26656',
        provider: 'Reecepbcups'
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc.uni.junonetwork.io',
        provider: 'Juno'
      },
      {
        address: 'https://juno-testnet-rpc.polkachu.com',
        provider: 'Polkachu'
      },
      {
        address: 'https://uni-rpc.reece.sh',
        provider: 'Reecepbcups'
      }
    ],
    rest: [
      {
        address: 'https://api.uni.junonetwork.io',
        provider: 'Juno'
      },
      {
        address: 'https://juno-testnet-api.polkachu.com',
        provider: 'Polkachu'
      },
      {
        address: 'https://uni-api.reece.sh',
        provider: 'Reecepbcups'
      }
    ],
    grpc: [
      {
        address: 'juno-testnet-grpc.polkachu.com:12690',
        provider: 'Polkachu'
      }
    ]
  },
  explorers: [
    {
      kind: 'EZ Staking Tools',
      url: 'https://testnet.ezstaking.tools/juno-testnet',
      tx_page: 'https://testnet.ezstaking.tools/juno-testnet/txs/${txHash}',
      account_page: 'https://testnet.ezstaking.tools/juno-testnet/account/${accountAddress}'
    },
    {
      kind: 'Mintscan',
      url: 'https://testnet.mintscan.io/juno-testnet',
      tx_page: 'https://testnet.mintscan.io/juno-testnet/txs/${txHash}'
    },
    {
      kind: 'NodesGuru',
      url: 'https://testnet.juno.explorers.guru/',
      tx_page: 'https://testnet.juno.explorers.guru/transaction/${txHash}'
    }
  ]
};
const injectivetestnet: Chain = {
  $schema: '../chain.schema.json',
  chain_name: 'injectivetestnet',
  status: 'live',
  network_type: 'testnet',
  website: 'https://injective.com',
  pretty_name: 'Injective Testnet',
  chain_id: 'injective-888',
  bech32_prefix: 'inj',
  extra_codecs: ['injective'],
  slip44: 60,
  daemon_name: 'injectived',
  node_home: '$HOME/.injectived',
  assets: injective_testnet_assets,
  fees: {
    fee_tokens: [
      {
        denom: 'inj',
        fixed_min_gas_price: 500000000,
        low_gas_price: 500000000,
        average_gas_price: 700000000,
        high_gas_price: 900000000
      }
    ]
  },
  staking: {
    staking_tokens: [
      {
        denom: 'inj'
      }
    ]
  },
  codebase: {
    git_repo: 'https://github.com/InjectiveLabs/testnet',
    recommended_version: 'v1.10.2',
    compatible_versions: ['v1.10.2'],
    binaries: {
      'linux/amd64': 'https://github.com/InjectiveLabs/testnet/releases/download/v1.10.2-1678712142/linux-amd64.zip',
      'darwin/amd64': 'https://github.com/InjectiveLabs/testnet/releases/download/v1.10.2-1678712142/darwin-amd64.zip'
    },
    genesis: {
      genesis_url: 'aws s3 cp s3://injective-snapshots/testnet/genesis.json . --no-sign-request'
    },
    versions: [
      {
        name: 'v1.10.2',
        recommended_version: 'v1.10.2',
        compatible_versions: ['v1.10.2'],
        binaries: {
          'linux/amd64': 'https://github.com/InjectiveLabs/testnet/releases/download/v1.10.2-1678712142/linux-amd64.zip',
          'darwin/amd64': 'https://github.com/InjectiveLabs/testnet/releases/download/v1.10.2-1678712142/darwin-amd64.zip'
        }
      }
    ]
  },
  peers: {
    seeds: [],
    persistent_peers: [
      {
        id: 'e5cc63a9117e6f372169f15774ea4f7c5177da25',
        address: '34.23.245.175:26656',
        provider: 'injectivelabs.org'
      },
      {
        id: '5bf72750f7e015ccfd65246c9f16185144867aff',
        address: '35.231.107.231:26656',
        provider: 'injectivelabs.org'
      },
      {
        id: '588dd6d1e1a338d1524efcfbd1c2a9bfc5df33d2',
        address: '104.196.43.6:26656',
        provider: 'injectivelabs.org'
      },
      {
        id: '8a05cc5bc466169a7332287ddce4cd8995684d1a',
        address: '34.73.247.128:26656',
        provider: 'injectivelabs.org'
      },
      {
        id: '0a2af0f999b08ccaf8825198d9aafb8b947c003f',
        address: '34.73.57.164:26656',
        provider: 'injectivelabs.org'
      },
      {
        id: 'd0c2407f4b1cef137d9d3ada69478234ad2a28f4',
        address: '34.73.57.164:26656',
        provider: 'injectivelabs.org'
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: 'https://k8s.testnet.tm.injective.network:443',
        provider: 'injectiveLabs'
      },
      {
        address: 'https://testnet.tm.injective.network',
        provider: 'injectiveLabs'
      }
    ],
    rest: [
      {
        address: 'https://k8s.testnet.lcd.injective.network',
        provider: 'injectiveLabs'
      },
      {
        address: 'https://testnet.grpc.injective.network',
        provider: 'injectiveLabs'
      }
    ],
    grpc: [
      {
        address: 'k8s.testnet.chain.grpc.injective.network:443',
        provider: 'injectiveLabs'
      },
      {
        address: 'https://testnet.grpc.injective.network',
        provider: 'injectiveLabs'
      }
    ]
  },
  explorers: [
    {
      kind: 'injectiveprotocol',
      url: 'https://testnet.explorer.injective.network/',
      tx_page: 'https://testnet.explorer.injective.network/transaction/${txHash}'
    }
  ]
};

const archwaytestnet: Chain = {
  $schema: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/chain.schema.json',
  chain_name: 'archwaytestnet',
  status: 'live',
  network_type: 'testnet',
  assets: archway_testnet_assets,
  website: 'https://archway.io/',
  pretty_name: 'Archway Testnet',
  chain_id: 'constantine-3',
  bech32_prefix: 'archway',
  daemon_name: 'archwayd',
  node_home: '$HOME/.archway',
  key_algos: ['secp256k1'],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: 'aconst',
        low_gas_price: 0,
        average_gas_price: 0.025,
        high_gas_price: 0.05
      }
    ]
  },
  staking: {
    staking_tokens: [
      {
        denom: 'aconst'
      }
    ]
  },
  codebase: {
    git_repo: 'https://github.com/archway-network/archway',
    recommended_version: 'v0.5.1',
    compatible_versions: ['v0.5.0', 'v0.5.1'],
    binaries: {
      'linux/amd64': 'https://github.com/archway-network/archway/releases/download/v0.5.1/archwayd_linux_amd64',
      'linux/arm64': 'https://github.com/archway-network/archway/releases/download/v0.5.1/archwayd_linux_arm64'
    },
    cosmos_sdk_version: 'v0.45.14',
    cosmwasm_version: 'v0.29.2-archway',
    cosmwasm_enabled: true,
    ibc_go_version: 'v3.3.0',
    genesis: {
      genesis_url: 'https://github.com/archway-network/networks/raw/main/constantine-3/genesis.json'
    },
    versions: [
      {
        name: 'v0.5.1',
        tag: 'v0.5.1',
        height: 1
      }
    ]
  },
  peers: {
    seeds: [
      {
        id: 'e8d60ff778f3c27f54382ff22c7ac071f2a81027',
        address: '35.223.36.227:26656',
        provider: 'Archway Foundation'
      }
    ],
    persistent_peers: [
      {
        id: '7e31ab391f5b5756a75dc18b5275b609c81a34ee',
        address: '34.122.164.239:26656',
        provider: 'Archway Foundation'
      },
      {
        id: '6b137e1df61936010ea30a354d8abd7010598e29',
        address: '35.239.130.141:26656',
        provider: 'Archway Foundation'
      },
      {
        id: '7786f708c1851dd433a03f71ec3ff74d65895de7',
        address: '34.31.130.235:26656',
        provider: 'Archway Foundation'
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc.constantine.archway.tech',
        provider: 'Archway Foundation'
      }
    ],
    rest: [
      {
        address: 'https://api.constantine.archway.tech',
        provider: 'Archway Foundation'
      }
    ],
    grpc: [
      {
        address: 'grpc.constantine.archway.tech:443',
        provider: 'Archway Foundation'
      }
    ]
  },
  explorers: [
    {
      kind: 'Nodes Guru',
      url: 'https://testnet.archway.explorers.guru/',
      tx_page: 'https://testnet.archway.explorers.guru/transaction/${txHash}',
      account_page: 'https://testnet.archway.explorers.guru/account/${accountAddress}'
    }
  ]
};

const neutrontestnet: Chain = {
  $schema: '../../chain.schema.json',
  chain_name: 'neutrontestnet',
  status: 'live',
  network_type: 'testnet',
  pretty_name: 'Neutron Testnet',
  chain_id: 'pion-1',
  bech32_prefix: 'neutron',
  daemon_name: 'neutrond',
  node_home: '$HOME/.neutrond',
  key_algos: ['secp256k1'],
  slip44: 118,
  assets: neutron_testnet_assets,
  fees: {
    fee_tokens: [
      {
        denom: 'untrn',
        low_gas_price: 0,
        average_gas_price: 0.025,
        high_gas_price: 0.05
      }
    ]
  },
  codebase: {
    git_repo: 'https://github.com/neutron-org/neutron',
    recommended_version: 'v0.4.3',
    compatible_versions: [],
    cosmos_sdk_version: '0.45',
    consensus: {
      type: 'tendermint',
      version: '0.34'
    },
    cosmwasm_version: '0.31',
    cosmwasm_enabled: true,
    ibc_go_version: '4.3.0',
    genesis: {
      genesis_url: 'https://github.com/cosmos/testnets/raw/master/replicated-security/pion-1/pion-1-genesis.json'
    },
    versions: [
      {
        name: 'v0.4.3',
        recommended_version: 'v0.4.3',
        compatible_versions: [],
        cosmos_sdk_version: '0.45',
        consensus: {
          type: 'tendermint',
          version: '0.34'
        },
        cosmwasm_version: '0.31',
        cosmwasm_enabled: true,
        ibc_go_version: '4.3.0'
      }
    ]
  },
  logo_URIs: {
    png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/neutrontestnet/images/neutron-black-logo.png',
    svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/neutrontestnet/images/neutron-black-logo.svg'
  },
  peers: {
    seeds: [
      {
        id: 'e2c07e8e6e808fb36cca0fc580e31216772841df',
        address: 'p2p-palvus.pion-1.ntrn.tech:26656',
        provider: 'Neutron'
      }
    ],
    persistent_peers: [
      {
        id: '49d75c6094c006b6f2758e45457c1f3d6002ce7a',
        address: 'pion-banana.rs-testnet.polypore.xyz:26656',
        provider: 'Hypha'
      },
      {
        id: 'f2520026fb9086f1b2f09e132d209cbe88064ec1',
        address: 'pion-cherry.rs-testnet.polypore.xyz:26656',
        provider: 'Hypha'
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc-palvus.pion-1.ntrn.tech',
        provider: 'Neutron'
      },
      {
        address: 'https://rpc.pion.remedy.tm.p2p.org',
        provider: 'P2P.ORG'
      },
      {
        address: 'https://rpc.baryon-sentry-01.rs-testnet.polypore.xyz',
        provider: 'Hypha'
      }
    ],
    rest: [
      {
        address: 'https://rest-palvus.pion-1.ntrn.tech',
        provider: 'Neutron'
      },
      {
        address: 'https://api.pion.remedy.tm.p2p.org',
        provider: 'P2P.ORG'
      },
      {
        address: 'https://rest.baryon-sentry-01.rs-testnet.polypore.xyz',
        provider: 'Hypha'
      }
    ],
    grpc: [
      {
        address: 'grpc-palvus.pion-1.ntrn.tech:80',
        provider: 'Neutron'
      },
      {
        address: 'grpc.baryon.remedy.tm.p2p.org:443',
        provider: 'P2P.ORG'
      }
    ]
  },
  explorers: [
    {
      kind: 'Ping.pub Explorer from Hypha',
      url: 'https://explorer.rs-testnet.polypore.xyz/pion-1',
      tx_page: 'https://explorer.rs-testnet.polypore.xyz/pion-1/tx/${txHash}',
      account_page: 'https://explorer.rs-testnet.polypore.xyz/baryon-1/account/${accountAddress}'
    },
    {
      kind: 'Mintscan',
      url: 'https://testnet.mintscan.io/neutron-testnet',
      tx_page: 'https://testnet.mintscan.io/neutron-testnet/txs/${txHash}',
      account_page: 'https://testnet.mintscan.io/neutron-testnet/account/${accountAddress}'
    }
  ]
};

const juno: Chain = {
  $schema: '../chain.schema.json',
  chain_name: 'juno',
  status: 'live',
  network_type: 'mainnet',
  website: 'https://www.junonetwork.io/',
  pretty_name: 'Juno',
  chain_id: 'juno-1',
  bech32_prefix: 'juno',
  daemon_name: 'junod',
  node_home: '$HOME/.juno',
  key_algos: ['secp256k1'],
  slip44: 118,
  assets: juno_assets,
  fees: {
    fee_tokens: [
      {
        denom: 'ujuno',
        fixed_min_gas_price: 0.001,
        low_gas_price: 0.001,
        average_gas_price: 0.0025,
        high_gas_price: 0.004
      }
    ]
  },
  staking: {
    staking_tokens: [
      {
        denom: 'ujuno'
      }
    ]
  },
  codebase: {
    git_repo: 'https://github.com/CosmosContracts/juno',
    recommended_version: 'v14.0.0',
    compatible_versions: ['v14.0.0'],
    cosmos_sdk_version: '0.45',
    consensus: {
      type: 'tendermint',
      version: '0.34'
    },
    cosmwasm_version: '0.30',
    cosmwasm_enabled: true,
    genesis: {
      genesis_url: 'https://download.dimi.sh/juno-phoenix2-genesis.tar.gz'
    },
    versions: [
      {
        name: 'v13',
        recommended_version: 'v13.0.0',
        compatible_versions: ['v13.0.0'],
        cosmos_sdk_version: '0.45',
        consensus: {
          type: 'tendermint',
          version: '0.34'
        },
        cosmwasm_version: '0.30',
        cosmwasm_enabled: true,
        next_version_name: 'v14'
      },
      {
        name: 'v14',
        height: 7875721,
        recommended_version: 'v14.0.0',
        compatible_versions: ['v14.0.0']
      }
    ]
  },
  peers: {
    seeds: [
      {
        id: 'babc3f3f7804933265ec9c40ad94f4da8e9e0017',
        address: 'seed.rhinostake.com:12656',
        provider: 'RHINO'
      },
      {
        id: '90b09362d9ce3845096c4938eea0dba682b0ad2c',
        address: 'juno-seed-new.blockpane.com:26656'
      },
      {
        id: 'ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0',
        address: 'seeds.polkachu.com:12656',
        provider: 'Polkachu'
      },
      {
        id: '20e1000e88125698264454a884812746c2eb4807',
        address: 'seeds.lavenderfive.com:12656',
        provider: 'Lavender.Five Nodes 🐝'
      },
      {
        id: 'ea67180befe4d9ca71142d21ada8ff58cc08f71c',
        address: 'seeds.goldenratiostaking.net:1627',
        provider: 'Golden Ratio Staking'
      },
      {
        id: 'e1b058e5cfa2b836ddaa496b10911da62dcf182e',
        address: 'juno-seed-1.allnodes.me:26656',
        provider: 'Allnodes.com ⚡️ Nodes & Staking'
      },
      {
        id: 'e726816f42831689eab9378d5d577f1d06d25716',
        address: 'juno-seed-2.allnodes.me:26656',
        provider: 'Allnodes.com ⚡️ Nodes & Staking'
      },
      {
        id: 'ebc272824924ea1a27ea3183dd0b9ba713494f83',
        address: 'juno-mainnet-seed.autostake.com:27136',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        id: '70fcee92283edc02340289b2a74e4ab1a0203848',
        address: 'seed-juno.freshstaking.com:39656',
        provider: 'FreshSTAKING'
      }
    ],
    persistent_peers: [
      {
        id: '7f593757c0cde8972ce929381d8ac8e446837811',
        address: '178.18.255.244:26656'
      },
      {
        id: 'ebc272824924ea1a27ea3183dd0b9ba713494f83',
        address: 'juno-mainnet-peer.autostake.com:27136',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        id: '70fcee92283edc02340289b2a74e4ab1a0203848',
        address: 'seed-juno.freshstaking.com:39656',
        provider: 'FreshSTAKING'
      }
    ]
  },
  apis: {
    rpc: [
      {
        address: 'https://rpc-juno.whispernode.com:443',
        provider: 'WhisperNode🤐'
      },
      {
        address: 'https://rpc-juno.goldenratiostaking.net',
        provider: 'Golden Ratio Staking'
      },
      {
        address: 'https://rpc-juno.itastakers.com',
        provider: 'itastakers'
      },
      {
        address: 'https://rpc-juno.ecostake.com',
        provider: 'ecostake'
      },
      {
        address: 'https://juno-rpc.polkachu.com',
        provider: 'Polkachu'
      },
      {
        address: 'https://juno-rpc.lavenderfive.com:443',
        provider: 'Lavender.Five Nodes 🐝'
      },
      {
        address: 'https://rpc-juno.pupmos.network',
        provider: 'PUPMØS'
      },
      {
        address: 'https://rpc-juno-ia.cosmosia.notional.ventures/',
        provider: 'Notional'
      },
      {
        address: 'https://rpc.juno.chaintools.tech/',
        provider: 'ChainTools'
      },
      {
        address: 'https://juno-rpc.kleomedes.network',
        provider: 'Kleomedes'
      },
      {
        address: 'https://rpc.juno.interbloc.org',
        provider: 'Interbloc'
      },
      {
        address: 'https://juno.rpc.stakin-nodes.com',
        provider: 'Stakin'
      },
      {
        address: 'https://juno-rpc.icycro.org',
        provider: 'IcyCRO 🧊'
      },
      {
        address: 'https://rpc.juno.bh.rocks',
        provider: 'BlockHunters 🎯'
      },
      {
        address: 'https://juno.kingnodes.com',
        provider: 'kingnodes 👑'
      },
      {
        address: 'https://juno-rpc.reece.sh',
        provider: 'Reecepbcups'
      },
      {
        address: 'https://juno-rpc.stakeandrelax.net',
        provider: 'Stake&Relax Validator 🦥'
      },
      {
        address: 'https://juno-mainnet-rpc.autostake.com:443',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        address: 'http://rpc-juno.freshstaking.com:39657',
        provider: 'FreshSTAKING'
      },
      {
        address: 'https://rpc-juno.architectnodes.com',
        provider: 'Architect Nodes'
      },
      {
        address: 'https://juno.rpc.interchain.ivaldilabs.xyz',
        provider: 'ivaldilabs'
      },
      {
        address: 'https://juno-rpc.cosmosrescue.com',
        provider: 'cosmosrescue'
      },
      {
        address: 'http://167.235.211.168:26657',
        provider: 'CommunityStaking'
      }
    ],
    rest: [
      {
        address: 'https://lcd-juno.itastakers.com',
        provider: 'itastakers'
      },
      {
        address: 'https://rest-juno.ecostake.com',
        provider: 'ecostake'
      },
      {
        address: 'https://juno-api.lavenderfive.com:443',
        provider: 'Lavender.Five Nodes 🐝'
      },
      {
        address: 'https://api-juno.pupmos.network',
        provider: 'PUPMØS'
      },
      {
        address: 'https://api-juno-ia.cosmosia.notional.ventures/',
        provider: 'Notional'
      },
      {
        address: 'https://api.juno.chaintools.tech/',
        provider: 'ChainTools'
      },
      {
        address: 'https://juno-api.polkachu.com',
        provider: 'Polkachu'
      },
      {
        address: 'https://juno-api.kleomedes.network',
        provider: 'Kleomedes'
      },
      {
        address: 'https://api.juno.interbloc.org',
        provider: 'Interbloc'
      },
      {
        address: 'https://juno.rest.stakin-nodes.com',
        provider: 'Stakin'
      },
      {
        address: 'https://api.juno.bh.rocks',
        provider: 'BlockHunters 🎯'
      },
      {
        address: 'https://juno.kingnodes.com',
        provider: 'kingnodes 👑'
      },
      {
        address: 'https://juno-api.reece.sh',
        provider: 'Reecepbcups'
      },
      {
        address: 'https://juno-api.stakeandrelax.net',
        provider: 'Stake&Relax Validator 🦥'
      },
      {
        address: 'https://rest-juno.architectnodes.com',
        provider: 'Architect Nodes'
      },
      {
        address: 'https://juno-mainnet-lcd.autostake.com:443',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        address: 'https://juno.rest.interchain.ivaldilabs.xyz',
        provider: 'ivaldilabs'
      },
      {
        address: 'https://juno-api.cosmosrescue.com',
        provider: 'cosmosrescue'
      },
      {
        address: 'http://167.235.211.168:1317',
        provider: 'CommunityStaking'
      }
    ],
    grpc: [
      {
        address: 'grpc-juno-ia.cosmosia.notional.ventures:443',
        provider: 'Notional'
      },
      {
        address: 'juno-grpc.lavenderfive.com:443',
        provider: 'Lavender.Five Nodes 🐝'
      },
      {
        address: 'juno-grpc.polkachu.com:12690',
        provider: 'Polkachu'
      },
      {
        address: 'juno.grpc.stakin-nodes.com:443',
        provider: 'Stakin'
      },
      {
        address: 'grpc-juno.kingnodes.com:443',
        provider: 'kingnodes 👑'
      },
      {
        address: 'http://juno-grpc.stakeandrelax.net:12690',
        provider: 'Stake&Relax Validator 🦥'
      },
      {
        address: 'grpc-juno.architectnodes.com:1443',
        provider: 'Architect Nodes'
      },
      {
        address: 'juno-mainnet-grpc.autostake.com:443',
        provider: 'AutoStake 🛡️ Slash Protected'
      },
      {
        address: 'juno.grpc.interchain.ivaldilabs.xyz:443',
        provider: 'ivaldilabs'
      },
      {
        address: 'juno-grpc.cosmosrescue.com:9090',
        provider: 'cosmosrescue'
      },
      {
        address: 'http://167.235.211.168:9091',
        provider: 'CommunityStaking'
      }
    ]
  },
  explorers: [
    {
      kind: 'EZ Staking Tools',
      url: 'https://ezstaking.tools/juno',
      tx_page: 'https://ezstaking.tools/juno/txs/${txHash}',
      account_page: 'https://ezstaking.tools/juno/account/${accountAddress}'
    },
    {
      kind: 'ping.pub',
      url: 'https://ping.pub/juno',
      tx_page: 'https://ping.pub/juno/tx/${txHash}'
    },
    {
      kind: 'explorers.guru',
      url: 'https://juno.explorers.guru',
      tx_page: 'https://juno.explorers.guru/transaction/${txHash}'
    },
    {
      kind: 'mintscan',
      url: 'https://www.mintscan.io/juno',
      tx_page: 'https://www.mintscan.io/juno/txs/${txHash}',
      account_page: 'https://www.mintscan.io/juno/account/${accountAddress}'
    },
    {
      kind: 'atomscan',
      url: 'https://atomscan.com/juno',
      tx_page: 'https://atomscan.com/juno/transactions/${txHash}'
    },
    {
      kind: 'TC Network',
      url: 'https://explorer.tcnetwork.io/juno',
      tx_page: 'https://explorer.tcnetwork.io/juno/transaction/${txHash}'
    }
  ]
};

const mainnetChains = [juno];

const testnetChains = [junotestnet, injectivetestnet, archwaytestnet, neutrontestnet];

export const chains: Chains = isTestnet ? testnetChains : mainnetChains;
export const chainIds = chains.map((chain) => chain.chain_id);
export const chainNames = chains.map((chain) => chain.chain_name);
