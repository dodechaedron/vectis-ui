const junotestnet = {
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
const injectivetestnet = {
  $schema: '../chain.schema.json',
  chain_name: 'injectivetestnet',
  status: 'live',
  network_type: 'testnet',
  website: 'https://injective.com',
  pretty_name: 'Injective',
  chain_id: 'injective-888',
  bech32_prefix: 'inj',
  extra_codecs: ['injective'],
  slip44: 60,
  daemon_name: 'injectived',
  node_home: '$HOME/.injectived',
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

const chains = [junotestnet, injectivetestnet];

export default chains;
