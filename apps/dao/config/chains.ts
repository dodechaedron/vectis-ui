export const chains = [
  {
    $schema: "../../chain.schema.json",
    chain_name: "junotestnet",
    status: "live",
    network_type: "testnet",
    pretty_name: "Juno Testnet",
    chain_id: "uni-6",
    bech32_prefix: "juno",
    daemon_name: "junod",
    node_home: "$HOME/.juno",
    key_algos: ["secp256k1"],
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "ujunox",
          low_gas_price: 0.03,
          average_gas_price: 0.04,
          high_gas_price: 0.05,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "ujunox",
        },
      ],
    },
    codebase: {
      git_repo: "https://github.com/CosmosContracts/juno",
      recommended_version: "v12.0.0-beta.1",
      compatible_versions: ["v12.0.0-beta.1"],
      cosmos_sdk_version: "0.45",
      tendermint_version: "0.34",
      cosmwasm_version: "0.29",
      cosmwasm_enabled: true,
      ibc_go_version: "3.3.1",
      genesis: {
        genesis_url: "https://raw.githubusercontent.com/CosmosContracts/testnets/main/uni-6/genesis.json",
      },
    },
    peers: {
      seeds: [
        {
          id: "babc3f3f7804933265ec9c40ad94f4da8e9e0017",
          address: "testnet-seed.rhinostake.com:12656",
          provider: "RHINO",
        },
      ],
      persistent_peers: [
        {
          id: "c54bf418fb542634495f57a1e36c9bd057d55e1b",
          address: "5.161.80.115:26656",
          provider: "Reecepbcups",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc.uni.junonetwork.io",
          provider: "Juno",
        },
        {
          address: "https://juno-testnet-rpc.polkachu.com",
          provider: "Polkachu",
        },
        {
          address: "https://uni-rpc.reece.sh",
          provider: "Reecepbcups",
        },
      ],
      rest: [
        {
          address: "https://api.uni.junonetwork.io",
          provider: "Juno",
        },
        {
          address: "https://juno-testnet-api.polkachu.com",
          provider: "Polkachu",
        },
        {
          address: "https://uni-api.reece.sh",
          provider: "Reecepbcups",
        },
      ],
      grpc: [
        {
          address: "juno-testnet-grpc.polkachu.com:12690",
          provider: "Polkachu",
        },
      ],
    },
    explorers: [
      {
        kind: "EZStaking Tools",
        url: "https://testnet.ezstaking.tools/juno-testnet",
        tx_page: "https://testnet.ezstaking.tools/juno-testnet/txs/${txHash}",
        account_page: "https://testnet.ezstaking.tools/juno-testnet/account/${accountAddress}",
      },
      {
        kind: "Mintscan",
        url: "https://testnet.mintscan.io/juno-testnet",
        tx_page: "https://testnet.mintscan.io/juno-testnet/txs/${txHash}",
      },
      {
        kind: "NodesGuru",
        url: "https://testnet.juno.explorers.guru/",
        tx_page: "https://testnet.juno.explorers.guru/transaction/${txHash}",
      },
    ],
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "juno",
    status: "live",
    network_type: "mainnet",
    website: "https://www.junonetwork.io/",
    pretty_name: "Juno",
    chain_id: "juno-1",
    bech32_prefix: "juno",
    daemon_name: "junod",
    node_home: "$HOME/.juno",
    key_algos: ["secp256k1"],
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "ujuno",
          fixed_min_gas_price: 0.0025,
          low_gas_price: 0.03,
          average_gas_price: 0.04,
          high_gas_price: 0.05,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "ujuno",
        },
      ],
    },
    codebase: {
      git_repo: "https://github.com/CosmosContracts/juno",
      recommended_version: "v11.0.0",
      compatible_versions: ["v11.0.0"],
      cosmos_sdk_version: "0.45",
      tendermint_version: "0.34",
      cosmwasm_version: "0.28",
      cosmwasm_enabled: true,
      genesis: {
        genesis_url: "https://download.dimi.sh/juno-phoenix2-genesis.tar.gz",
      },
    },
    peers: {
      seeds: [
        {
          id: "babc3f3f7804933265ec9c40ad94f4da8e9e0017",
          address: "seed.rhinostake.com:12656",
          provider: "RHINO",
        },
        {
          id: "2484353dab0b2c1275765b8ffa2c50b3b36158ca",
          address: "seed-node.junochain.com:26656",
        },
        {
          id: "90b09362d9ce3845096c4938eea0dba682b0ad2c",
          address: "juno-seed-new.blockpane.com:26656",
        },
        {
          id: "22ee6e65e5e79cd0b970dd11e52761de8d1d6dfd",
          address: "seeds.pupmos.network:2001",
          provider: "PUPMØS",
        },
        {
          id: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0",
          address: "seeds.polkachu.com:12656",
          provider: "Polkachu",
        },
        {
          id: "20e1000e88125698264454a884812746c2eb4807",
          address: "seeds.lavenderfive.com:12656",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          id: "ea67180befe4d9ca71142d21ada8ff58cc08f71c",
          address: "seeds.goldenratiostaking.net:1627",
          provider: "Golden Ratio Staking",
        },
        {
          id: "47d942718533d36823e16b9502c035ca9f318ef4",
          address: "seeds.whispernode.com:12656",
          provider: "WhisperNode🤐",
        },
        {
          id: "e1b058e5cfa2b836ddaa496b10911da62dcf182e",
          address: "juno-seed-1.allnodes.me:26656",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
        {
          id: "e726816f42831689eab9378d5d577f1d06d25716",
          address: "juno-seed-2.allnodes.me:26656",
          provider: "Allnodes.com ⚡️ Nodes & Staking",
        },
      ],
      persistent_peers: [
        {
          id: "b1f46f1a1955fc773d3b73180179b0e0a07adce1",
          address: "162.55.244.250:39656",
        },
        {
          id: "7f593757c0cde8972ce929381d8ac8e446837811",
          address: "178.18.255.244:26656",
        },
        {
          id: "7b22dfc605989d66b89d2dfe118d799ea5abc2f0",
          address: "167.99.210.65:26656",
        },
        {
          id: "4bd9cac019775047d27f9b9cea66b25270ab497d",
          address: "137.184.7.164:26656",
        },
        {
          id: "bd822a8057902fbc80fd9135e335f0dfefa32342",
          address: "65.21.202.159:38656",
        },
        {
          id: "15827c6c13f919e4d9c11bcca23dff4e3e79b1b8",
          address: "51.38.52.210:38656",
        },
        {
          id: "e665df28999b2b7b40cff2fe4030682c380bf294",
          address: "188.40.106.109:38656",
        },
        {
          id: "92804ce50c85ff4c7cf149d347dd880fc3735bf4",
          address: "34.94.231.154:26656",
        },
        {
          id: "795ed214b8354e8468f46d1bbbf6e128a88fe3bd",
          address: "34.127.19.222:26656",
        },
        {
          id: "ea9c1ac0e91639b2c7957d9604655e2263abe4e1",
          address: "185.181.103.136:26656",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "https://rpc-juno.whispernode.com:443",
          provider: "WhisperNode🤐",
        },
        {
          address: "https://rpc-juno.itastakers.com",
          provider: "itastakers",
        },
        {
          address: "https://rpc-juno.ecostake.com",
          provider: "ecostake",
        },
        {
          address: "https://juno-rpc.polkachu.com",
          provider: "Polkachu",
        },
        {
          address: "https://juno.rpc.interchain.ivaldilabs.xyz",
          provider: "Ivaldi Labs",
        },
        {
          address: "https://juno-rpc.lavenderfive.com:443",
          provider: "Lavender.Five Nodes 🐝",
        },
        {
          address: "https://rpc-juno.pupmos.network",
          provider: "PUPMØS",
        },
        {
          address: "https://rpc-juno-ia.cosmosia.notional.ventures/",
          provider: "Notional",
        },
        {
          address: "https://rpc.juno.chaintools.tech/",
          provider: "ChainTools",
        },
        {
          address: "https://rpc.juno.silknodes.io/",
          provider: "Silk Nodes",
        },
        {
          address: "https://juno-rpc.kleomedes.network",
          provider: "Kleomedes",
        },
        {
          address: "https://rpc.juno.interbloc.org",
          provider: "Interbloc",
        },
        {
          address: "https://juno.nodejumper.io",
          provider: "Nodejumper 🚀",
        },
        {
          address: "https://juno.rpc.stakin-nodes.com",
          provider: "Stakin",
        },
        {
          address: "https://juno-rpc.icycro.org",
        },
      ],
    },
  },
  {
    $schema: "../chain.schema.json",
    chain_name: "junolocalnet",
    status: "live",
    network_type: "localnet",
    pretty_name: "Juno Localnet",
    chain_id: "juno-local",
    bech32_prefix: "juno",
    daemon_name: "junod",
    node_home: "$HOME/.juno",
    key_algos: ["secp256k1"],
    slip44: 118,
    fees: {
      fee_tokens: [
        {
          denom: "ujuno",
          fixed_min_gas_price: 0.0025,
          low_gas_price: 0.03,
          average_gas_price: 0.04,
          high_gas_price: 0.05,
        },
      ],
    },
    staking: {
      staking_tokens: [
        {
          denom: "ujuno",
        },
      ],
    },
    apis: {
      rpc: [
        {
          address: "http://localhost:26657",
          provider: "LocalNode",
        },
      ],
      rest: [
        {
          address: "http://localhost:1317",
          provider: "LocalNode",
        },
      ],
    },
  },
];
