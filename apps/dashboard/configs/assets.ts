import { Chain } from './chains';
import { isTestnet } from './network';

import { AssetList } from '@chain-registry/types';

export const juno_testnet_assets: AssetList = {
  chain_name: 'junotestnet',
  assets: [
    {
      description: 'The native token of JUNO Chain',
      denom_units: [
        {
          denom: 'ujunox',
          exponent: 0
        },
        {
          denom: 'junox',
          exponent: 6
        }
      ],
      base: 'ujunox',
      name: 'Juno Testnet',
      display: 'junox',
      symbol: 'JUNOX',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/junotestnet/images/juno.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/junotestnet/images/juno.svg'
      },
      coingecko_id: 'juno-network'
    }
  ]
};

export const injective_testnet_assets: AssetList = {
  chain_name: 'injectivetestnet',
  assets: [
    {
      description: 'The INJ token is the native governance token for the Injective chain.',
      denom_units: [
        {
          denom: 'inj',
          exponent: 0
        },
        {
          denom: 'INJ',
          exponent: 18
        }
      ],
      base: 'inj',
      name: 'Injective',
      display: 'INJ',
      symbol: 'INJ',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.svg'
      },
      coingecko_id: 'injective-protocol'
    }
  ]
};

export const archway_testnet_assets: AssetList = {
  chain_name: 'archwaytestnet',
  assets: [
    {
      description: 'The native token of Archway testnetwork',
      denom_units: [
        {
          denom: 'uconst',
          exponent: 0
        },
        {
          denom: 'const',
          exponent: 6
        }
      ],
      base: 'uconst',
      name: 'Archway',
      display: 'const',
      symbol: 'CONST'
    }
  ]
};

export const neutron_testnet_assets: AssetList = {
  chain_name: 'neutrontestnet',
  assets: [
    {
      description: 'The native token of Neutron chain',
      denom_units: [
        {
          denom: 'untrn',
          exponent: 0
        },
        {
          denom: 'ntrn',
          exponent: 6
        }
      ],
      base: 'untrn',
      name: 'Neutron Testnet',
      display: 'ntrn',
      symbol: 'NTRN',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/neutrontestnet/images/neutron.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/neutrontestnet/images/neutron.svg'
      }
    }
  ]
};

export const juno_assets = {
  $schema: '../assetlist.schema.json',
  chain_name: 'juno',
  assets: [
    {
      description: 'The native token of JUNO Chain',
      denom_units: [
        {
          denom: 'ujuno',
          exponent: 0
        },
        {
          denom: 'juno',
          exponent: 6
        }
      ],
      base: 'ujuno',
      name: 'Juno',
      display: 'juno',
      symbol: 'JUNO',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.svg'
      },
      coingecko_id: 'juno-network'
    },
    {
      description: 'The native token cw20 for Neta on Juno Chain',
      type_asset: 'cw20',
      address: 'juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
      denom_units: [
        {
          denom: 'cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
          exponent: 0
        },
        {
          denom: 'neta',
          exponent: 6
        }
      ],
      base: 'cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
      name: 'Neta',
      display: 'neta',
      symbol: 'NETA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/neta.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/neta.svg'
      },
      coingecko_id: 'neta'
    },
    {
      description: 'The native token cw20 for Marble DAO on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
      denom_units: [
        {
          denom: 'cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
          exponent: 0
        },
        {
          denom: 'marble',
          exponent: 3
        }
      ],
      base: 'cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl',
      name: 'Marble',
      display: 'marble',
      symbol: 'MARBLE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/marble.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/marble.svg'
      },
      coingecko_id: 'marble'
    },
    {
      description: 'Hope Galaxy is an NFT collection based on its own native Token $HOPE, a cw20 token on Juno chain.',
      type_asset: 'cw20',
      address: 'juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z',
      denom_units: [
        {
          denom: 'cw20:juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z',
          exponent: 0
        },
        {
          denom: 'hope',
          exponent: 6
        }
      ],
      base: 'cw20:juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z',
      name: 'Hope Galaxy',
      display: 'hope',
      symbol: 'HOPE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hope.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hope.svg'
      },
      coingecko_id: 'hope-galaxy'
    },
    {
      description: 'Racoon aims to simplify accessibility to AI, NFTs and Gambling on the Cosmos Ecosystem',
      type_asset: 'cw20',
      address: 'juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa',
      denom_units: [
        {
          denom: 'cw20:juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa',
          exponent: 0
        },
        {
          denom: 'rac',
          exponent: 6
        }
      ],
      base: 'cw20:juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa',
      name: 'Racoon',
      display: 'rac',
      symbol: 'RAC',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/rac.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/rac.svg'
      },
      coingecko_id: 'racoon'
    },
    {
      description: 'The native token of Marble DEX on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq',
      denom_units: [
        {
          denom: 'cw20:juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq',
          exponent: 0
        },
        {
          denom: 'block',
          exponent: 6
        }
      ],
      base: 'cw20:juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq',
      name: 'Block',
      display: 'block',
      symbol: 'BLOCK',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/block.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/block.svg'
      }
    },
    {
      description: 'The DAO token to build consensus among Hong Kong People',
      type_asset: 'cw20',
      address: 'juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49',
      denom_units: [
        {
          denom: 'cw20:juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49',
          exponent: 0,
          aliases: ['dhk']
        }
      ],
      base: 'cw20:juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49',
      name: 'DHK',
      display: 'dhk',
      symbol: 'DHK',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/dhk.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/dhk.svg'
      }
    },
    {
      description: 'Token governance for Junoswap',
      type_asset: 'cw20',
      address: 'juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g',
      denom_units: [
        {
          denom: 'cw20:juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g',
          exponent: 0
        },
        {
          denom: 'raw',
          exponent: 6
        }
      ],
      base: 'cw20:juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g',
      name: 'JunoSwap',
      display: 'raw',
      symbol: 'RAW',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/raw.svg',
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/raw.png'
      },
      coingecko_id: 'junoswap-raw-dao'
    },
    {
      description:
        'Profit sharing token for Another.Software validator. Hold and receive dividends from Another.Software validator commissions!',
      type_asset: 'cw20',
      address: 'juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w',
      denom_units: [
        {
          denom: 'cw20:juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w',
          exponent: 0
        },
        {
          denom: 'asvt',
          exponent: 6
        }
      ],
      base: 'cw20:juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w',
      name: 'Another.Software Validator Token',
      display: 'asvt',
      symbol: 'ASVT',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/asvt.png'
      }
    },
    {
      description:
        'IBC HNS is HNS, coin of Handshake, decentralized root namesystem, but wrapped to cosmos for IBC support by Another.Software through Juno netowrk.',
      type_asset: 'cw20',
      address: 'juno1ur4jx0sxchdevahep7fwq28yk4tqsrhshdtylz46yka3uf6kky5qllqp4k',
      denom_units: [
        {
          denom: 'cw20:juno1ur4jx0sxchdevahep7fwq28yk4tqsrhshdtylz46yka3uf6kky5qllqp4k',
          exponent: 0
        },
        {
          denom: 'hns',
          exponent: 6
        }
      ],
      base: 'cw20:juno1ur4jx0sxchdevahep7fwq28yk4tqsrhshdtylz46yka3uf6kky5qllqp4k',
      name: 'IBC HNS (Handshake)',
      display: 'hns',
      symbol: 'HNS',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hns.svg'
      }
    },
    {
      description: 'DAO dedicated to building tools on the Juno Network',
      type_asset: 'cw20',
      address: 'juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3',
      denom_units: [
        {
          denom: 'cw20:juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3',
          exponent: 0
        },
        {
          denom: 'joe',
          exponent: 6
        }
      ],
      base: 'cw20:juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3',
      name: 'JoeDAO',
      display: 'joe',
      symbol: 'JOE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/joe.png'
      }
    },
    {
      description: 'Governance Token for Digital Land Acquisition DAO',
      type_asset: 'cw20',
      address: 'juno1sfwye65qxcfsc837gu5qcprcz7w49gkv3wnat04764ld76hy3arqs779tr',
      denom_units: [
        {
          denom: 'cw20:juno1sfwye65qxcfsc837gu5qcprcz7w49gkv3wnat04764ld76hy3arqs779tr',
          exponent: 0
        },
        {
          denom: 'dla',
          exponent: 6
        }
      ],
      base: 'cw20:juno1sfwye65qxcfsc837gu5qcprcz7w49gkv3wnat04764ld76hy3arqs779tr',
      name: 'Digital Land Acquisition DAO',
      display: 'dla',
      symbol: 'DLA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/dla.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/dla.svg'
      }
    },
    {
      description: 'DeFi gaming platform built on Juno',
      type_asset: 'cw20',
      address: 'juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se',
      denom_units: [
        {
          denom: 'cw20:juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se',
          exponent: 0
        },
        {
          denom: 'glto',
          exponent: 6
        }
      ],
      base: 'cw20:juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se',
      name: 'Gelotto',
      display: 'glto',
      symbol: 'GLTO',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/glto.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/glto.svg'
      }
    },
    {
      description: 'Gelotto Year 1 Grand Prize Token',
      type_asset: 'cw20',
      address: 'juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh',
      denom_units: [
        {
          denom: 'cw20:juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh',
          exponent: 0
        },
        {
          denom: 'gkey',
          exponent: 6
        }
      ],
      base: 'cw20:juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh',
      name: 'GKey',
      display: 'gkey',
      symbol: 'GKEY',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/gkey.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/gkey.svg'
      }
    },
    {
      description: 'The native token cw20 for BlackHole on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1t46z6hg8vvsena7sue0vg6w85ljar3cundplkre9sz0skeqkap9sxyyy6m',
      denom_units: [
        {
          denom: 'cw20:juno1t46z6hg8vvsena7sue0vg6w85ljar3cundplkre9sz0skeqkap9sxyyy6m',
          exponent: 0
        },
        {
          denom: 'hole',
          exponent: 6
        }
      ],
      base: 'cw20:juno1t46z6hg8vvsena7sue0vg6w85ljar3cundplkre9sz0skeqkap9sxyyy6m',
      name: 'BlackHole',
      display: 'hole',
      symbol: 'HOLE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hole.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hole.svg'
      }
    },
    {
      description: 'Staking derivative seJUNO for staked JUNO',
      type_asset: 'cw20',
      address: 'juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv',
      denom_units: [
        {
          denom: 'cw20:juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv',
          exponent: 0
        },
        {
          denom: 'sejuno',
          exponent: 6
        }
      ],
      base: 'cw20:juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv',
      name: 'StakeEasy seJUNO',
      display: 'sejuno',
      symbol: 'SEJUNO',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sejuno.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sejuno.svg'
      },
      coingecko_id: 'stakeeasy-juno-derivative'
    },
    {
      description: 'Staking derivative bJUNO for staked JUNO',
      type_asset: 'cw20',
      address: 'juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3',
      denom_units: [
        {
          denom: 'cw20:juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3',
          exponent: 0
        },
        {
          denom: 'bjuno',
          exponent: 6
        }
      ],
      base: 'cw20:juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3',
      name: 'StakeEasy bJUNO',
      display: 'bjuno',
      symbol: 'BJUNO',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/bjuno.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/bjuno.svg'
      },
      coingecko_id: 'stakeeasy-bjuno'
    },
    {
      description: 'Solarbank DAO Governance Token for speeding up the shift to renewable and green energy',
      type_asset: 'cw20',
      address: 'juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse',
      denom_units: [
        {
          denom: 'cw20:juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse',
          exponent: 0
        },
        {
          denom: 'solar',
          exponent: 6
        }
      ],
      base: 'cw20:juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse',
      name: 'Solarbank DAO',
      display: 'solar',
      symbol: 'SOLAR',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/solar.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/solar.svg'
      }
    },
    {
      description: 'StakeEasy governance token',
      type_asset: 'cw20',
      address: 'juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf',
      denom_units: [
        {
          denom: 'cw20:juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf',
          exponent: 0
        },
        {
          denom: 'seasy',
          exponent: 6
        }
      ],
      base: 'cw20:juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf',
      name: 'StakeEasy SEASY',
      display: 'seasy',
      symbol: 'SEASY',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/seasy.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/seasy.svg'
      },
      coingecko_id: 'seasy'
    },
    {
      description: 'The native token cw20 for MuseDAO on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3',
      denom_units: [
        {
          denom: 'cw20:juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3',
          exponent: 0
        },
        {
          denom: 'muse',
          exponent: 6
        }
      ],
      base: 'cw20:juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3',
      name: 'MuseDAO',
      display: 'muse',
      symbol: 'MUSE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/muse.png'
      }
    },
    {
      description: 'The native token cw20 for Loop Finance on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1qsrercqegvs4ye0yqg93knv73ye5dc3prqwd6jcdcuj8ggp6w0us66deup',
      denom_units: [
        {
          denom: 'cw20:juno1qsrercqegvs4ye0yqg93knv73ye5dc3prqwd6jcdcuj8ggp6w0us66deup',
          exponent: 0
        },
        {
          denom: 'loop',
          exponent: 6
        }
      ],
      base: 'cw20:juno1qsrercqegvs4ye0yqg93knv73ye5dc3prqwd6jcdcuj8ggp6w0us66deup',
      name: 'Loop Finance',
      display: 'loop',
      symbol: 'LOOP',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/loop.png'
      },
      coingecko_id: 'loop'
    },
    {
      description: 'The native token cw20 for Fanfury on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1cltgm8v842gu54srmejewghnd6uqa26lzkpa635wzra9m9xuudkqa2gtcz',
      denom_units: [
        {
          denom: 'cw20:juno1cltgm8v842gu54srmejewghnd6uqa26lzkpa635wzra9m9xuudkqa2gtcz',
          exponent: 0
        },
        {
          denom: 'fury',
          exponent: 6
        }
      ],
      base: 'cw20:juno1cltgm8v842gu54srmejewghnd6uqa26lzkpa635wzra9m9xuudkqa2gtcz',
      name: 'Fanfury',
      display: 'fury',
      symbol: 'FURY',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/fanfury.png'
      },
      coingecko_id: 'fanfury'
    },
    {
      description: 'The native token cw20 for PHMN on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1rws84uz7969aaa7pej303udhlkt3j9ca0l3egpcae98jwak9quzq8szn2l',
      denom_units: [
        {
          denom: 'cw20:juno1rws84uz7969aaa7pej303udhlkt3j9ca0l3egpcae98jwak9quzq8szn2l',
          exponent: 0
        },
        {
          denom: 'phmn',
          exponent: 6
        }
      ],
      base: 'cw20:juno1rws84uz7969aaa7pej303udhlkt3j9ca0l3egpcae98jwak9quzq8szn2l',
      name: 'POSTHUMAN',
      display: 'phmn',
      symbol: 'PHMN',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/phmn.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/phmn.svg'
      },
      coingecko_id: 'posthuman'
    },
    {
      description: 'The native token cw20 for Hopers on Juno Chain',
      type_asset: 'cw20',
      address: 'juno1u45shlp0q4gcckvsj06ss4xuvsu0z24a0d0vr9ce6r24pht4e5xq7q995n',
      denom_units: [
        {
          denom: 'cw20:juno1u45shlp0q4gcckvsj06ss4xuvsu0z24a0d0vr9ce6r24pht4e5xq7q995n',
          exponent: 0
        },
        {
          denom: 'hopers',
          exponent: 6
        }
      ],
      base: 'cw20:juno1u45shlp0q4gcckvsj06ss4xuvsu0z24a0d0vr9ce6r24pht4e5xq7q995n',
      name: 'Hopers',
      display: 'hopers',
      symbol: 'HOPERS',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hopers.svg',
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hopers.png'
      },
      coingecko_id: 'hopers-io '
    },
    {
      description: 'RED',
      type_asset: 'cw20',
      address: 'juno1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za',
      denom_units: [
        {
          denom: 'cw20:juno1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za',
          exponent: 0
        },
        {
          denom: 'red',
          exponent: 6
        }
      ],
      base: 'cw20:juno1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za',
      name: 'Red',
      display: 'red',
      symbol: 'RED',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/red.png'
      }
    },
    {
      description: 'BLUE',
      type_asset: 'cw20',
      address: 'juno14q8kk464fafql2fwmlsgvgcdl6h2csqpzv4hr025fmcvgjahpess32k0j7',
      denom_units: [
        {
          denom: 'cw20:juno14q8kk464fafql2fwmlsgvgcdl6h2csqpzv4hr025fmcvgjahpess32k0j7',
          exponent: 0
        },
        {
          denom: 'blue',
          exponent: 6
        }
      ],
      base: 'cw20:juno14q8kk464fafql2fwmlsgvgcdl6h2csqpzv4hr025fmcvgjahpess32k0j7',
      name: 'Blue',
      display: 'blue',
      symbol: 'BLUE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/blue.png'
      }
    },
    {
      description: 'WYND DAO Governance Token',
      type_asset: 'cw20',
      address: 'juno1mkw83sv6c7sjdvsaplrzc8yaes9l42p4mhy0ssuxjnyzl87c9eps7ce3m9',
      denom_units: [
        {
          denom: 'cw20:juno1mkw83sv6c7sjdvsaplrzc8yaes9l42p4mhy0ssuxjnyzl87c9eps7ce3m9',
          exponent: 0
        },
        {
          denom: 'wynd',
          exponent: 6
        }
      ],
      base: 'cw20:juno1mkw83sv6c7sjdvsaplrzc8yaes9l42p4mhy0ssuxjnyzl87c9eps7ce3m9',
      name: 'Wynd DAO Governance Token',
      display: 'wynd',
      symbol: 'WYND',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/wynd.svg',
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/wynd.png'
      }
    },
    {
      description: 'Bored APE IBC club token',
      type_asset: 'cw20',
      address: 'juno1s2dp05rspeuzzpzyzdchk262szehrtfpz847uvf98cnwh53ulx4qg20qwj',
      denom_units: [
        {
          denom: 'cw20:juno1s2dp05rspeuzzpzyzdchk262szehrtfpz847uvf98cnwh53ulx4qg20qwj',
          exponent: 0
        },
        {
          denom: 'banana',
          exponent: 6
        }
      ],
      base: 'juno1s2dp05rspeuzzpzyzdchk262szehrtfpz847uvf98cnwh53ulx4qg20qwj',
      name: 'Banana Token',
      display: 'banana',
      symbol: 'BANANA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/banana.png'
      }
    },
    {
      description: 'nRide Token',
      type_asset: 'cw20',
      address: 'juno1qmlchtmjpvu0cr7u0tad2pq8838h6farrrjzp39eqa9xswg7teussrswlq',
      denom_units: [
        {
          denom: 'cw20:juno1qmlchtmjpvu0cr7u0tad2pq8838h6farrrjzp39eqa9xswg7teussrswlq',
          exponent: 0
        },
        {
          denom: 'nride',
          exponent: 6
        }
      ],
      base: 'cw20:juno1qmlchtmjpvu0cr7u0tad2pq8838h6farrrjzp39eqa9xswg7teussrswlq',
      name: 'nRide Token',
      display: 'nride',
      symbol: 'NRIDE',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/nride.svg',
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/nride.png'
      }
    },
    {
      description: 'Signal Art and Gaming on Juno',
      type_asset: 'cw20',
      address: 'juno14lycavan8gvpjn97aapzvwmsj8kyrvf644p05r0hu79namyj3ens87650k',
      denom_units: [
        {
          denom: 'cw20:juno14lycavan8gvpjn97aapzvwmsj8kyrvf644p05r0hu79namyj3ens87650k',
          exponent: 0
        },
        {
          denom: 'sgnl',
          exponent: 6
        }
      ],
      base: 'cw20:juno14lycavan8gvpjn97aapzvwmsj8kyrvf644p05r0hu79namyj3ens87650k',
      name: 'Signal',
      display: 'sgnl',
      symbol: 'SGNL',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sgnl.png'
      }
    },
    {
      description: 'Governance and utility token for the Junø Apes NFT platform on Juno',
      type_asset: 'cw20',
      address: 'juno1zkwveux7y6fmsr88atf3cyffx96p0c96qr8tgcsj7vfnhx7sal3s3zu3ps',
      denom_units: [
        {
          denom: 'cw20:juno1zkwveux7y6fmsr88atf3cyffx96p0c96qr8tgcsj7vfnhx7sal3s3zu3ps',
          exponent: 0
        },
        {
          denom: 'jape',
          exponent: 6
        }
      ],
      base: 'cw20:juno1zkwveux7y6fmsr88atf3cyffx96p0c96qr8tgcsj7vfnhx7sal3s3zu3ps',
      name: 'Junø Apes',
      display: 'jape',
      symbol: 'JAPE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/jape.png'
      }
    },
    {
      description: 'A community meme token with a fantasy fiction storyline and comic based NFTs on Juno',
      type_asset: 'cw20',
      address: 'juno12wxyvtqe76x2a5jj6ckp2hfq8v32m6rvyyxwwufl2tksqvkt7whqczv6pa',
      denom_units: [
        {
          denom: 'cw20:juno12wxyvtqe76x2a5jj6ckp2hfq8v32m6rvyyxwwufl2tksqvkt7whqczv6pa',
          exponent: 0
        },
        {
          denom: 'catom',
          exponent: 6
        }
      ],
      base: 'cw20:juno12wxyvtqe76x2a5jj6ckp2hfq8v32m6rvyyxwwufl2tksqvkt7whqczv6pa',
      name: 'Catom',
      display: 'catom',
      symbol: 'CATOM',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/catom.png'
      }
    },
    {
      description: 'Utility token of Howl.social, an on chain micro-blogging platform on Juno',
      type_asset: 'cw20',
      address: 'juno1g0wuyu2f49ncf94r65278puxzclf5arse9f3kvffxyv4se4vgdmsk4dvqz',
      denom_units: [
        {
          denom: 'cw20:juno1g0wuyu2f49ncf94r65278puxzclf5arse9f3kvffxyv4se4vgdmsk4dvqz',
          exponent: 0
        },
        {
          denom: 'howl',
          exponent: 6
        }
      ],
      base: 'cw20:juno1g0wuyu2f49ncf94r65278puxzclf5arse9f3kvffxyv4se4vgdmsk4dvqz',
      name: 'Howl',
      display: 'howl',
      symbol: 'HOWL',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/howl.png'
      }
    },
    {
      description: 'Inspired by Bonk. A community project to celebrate the settlers of JunoNetwork.',
      type_asset: 'cw20',
      address: 'juno1u8cr3hcjvfkzxcaacv9q75uw9hwjmn8pucc93pmy6yvkzz79kh3qncca8x',
      denom_units: [
        {
          denom: 'cw20:juno1u8cr3hcjvfkzxcaacv9q75uw9hwjmn8pucc93pmy6yvkzz79kh3qncca8x',
          exponent: 0
        },
        {
          denom: 'fox',
          exponent: 6
        }
      ],
      base: 'cw20:juno1u8cr3hcjvfkzxcaacv9q75uw9hwjmn8pucc93pmy6yvkzz79kh3qncca8x',
      name: 'Juno Fox',
      display: 'fox',
      symbol: 'FOX',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/fox.png'
      }
    },
    {
      description: 'Evmos Guardians governance token.',
      type_asset: 'cw20',
      address: 'juno1xekkh27punj0uxruv3gvuydyt856fax0nu750xns99t2qcxp7xmsqwhfma',
      denom_units: [
        {
          denom: 'cw20:juno1xekkh27punj0uxruv3gvuydyt856fax0nu750xns99t2qcxp7xmsqwhfma',
          exponent: 0
        },
        {
          denom: 'grdn',
          exponent: 6
        }
      ],
      base: 'cw20:juno1xekkh27punj0uxruv3gvuydyt856fax0nu750xns99t2qcxp7xmsqwhfma',
      name: 'Guardian',
      display: 'grdn',
      symbol: 'GRDN',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/guardian.png'
      }
    },
    {
      description: 'Mini Punks Token',
      type_asset: 'cw20',
      address: 'juno166heaxlyntd33a5euh4rrz26svhean4klzw594esmd02l4atan6sazy2my',
      denom_units: [
        {
          denom: 'cw20:juno166heaxlyntd33a5euh4rrz26svhean4klzw594esmd02l4atan6sazy2my',
          exponent: 0
        },
        {
          denom: 'mnpu',
          exponent: 6
        }
      ],
      base: 'cw20:juno166heaxlyntd33a5euh4rrz26svhean4klzw594esmd02l4atan6sazy2my',
      name: 'Mini Punks',
      display: 'mnpu',
      symbol: 'MNPU',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/mnpu.png',
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/mnpu.svg'
      }
    },
    {
      description: 'Kleomedes Token',
      type_asset: 'cw20',
      address: 'juno10gthz5ufgrpuk5cscve2f0hjp56wgp90psqxcrqlg4m9mcu9dh8q4864xy',
      denom_units: [
        {
          denom: 'cw20:juno10gthz5ufgrpuk5cscve2f0hjp56wgp90psqxcrqlg4m9mcu9dh8q4864xy',
          exponent: 0
        },
        {
          denom: 'kleo',
          exponent: 6
        }
      ],
      base: 'cw20:juno10gthz5ufgrpuk5cscve2f0hjp56wgp90psqxcrqlg4m9mcu9dh8q4864xy',
      name: 'Kleomedes',
      display: 'kleo',
      symbol: 'KLEO',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/kleomedes.png'
      }
    },
    {
      description: 'Sikoba Governance Token',
      type_asset: 'cw20',
      address: 'juno1qqwf3lkfjhp77yja7gmg3y95pda0e5xctqrdhf3wvwdd79flagvqfgrgxp',
      denom_units: [
        {
          denom: 'cw20:juno1qqwf3lkfjhp77yja7gmg3y95pda0e5xctqrdhf3wvwdd79flagvqfgrgxp',
          exponent: 0
        },
        {
          denom: 'sikoba',
          exponent: 6
        }
      ],
      base: 'cw20:juno1qqwf3lkfjhp77yja7gmg3y95pda0e5xctqrdhf3wvwdd79flagvqfgrgxp',
      name: 'Sikoba Token',
      display: 'sikoba',
      symbol: 'SKOJ',
      logo_URIs: {
        svg: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sikoba.svg',
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sikoba.png'
      }
    },
    {
      description: 'Shiba Cosmos',
      type_asset: 'cw20',
      address: 'juno1x5qt47rw84c4k6xvvywtrd40p8gxjt8wnmlahlqg07qevah3f8lqwxfs7z',
      denom_units: [
        {
          denom: 'cw20:juno1x5qt47rw84c4k6xvvywtrd40p8gxjt8wnmlahlqg07qevah3f8lqwxfs7z',
          exponent: 0
        },
        {
          denom: 'shibac',
          exponent: 6
        }
      ],
      base: 'cw20:juno1x5qt47rw84c4k6xvvywtrd40p8gxjt8wnmlahlqg07qevah3f8lqwxfs7z',
      name: 'ShibaCosmos',
      display: 'shibac',
      symbol: 'SHIBAC',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/shibacosmos.png'
      }
    },
    {
      description: 'Celestims',
      type_asset: 'cw20',
      address: 'juno1ngww7zxak55fql42wmyqrr4rhzpne24hhs4p3w4cwhcdgqgr3hxsmzl9zg',
      denom_units: [
        {
          denom: 'cw20:juno1ngww7zxak55fql42wmyqrr4rhzpne24hhs4p3w4cwhcdgqgr3hxsmzl9zg',
          exponent: 0
        },
        {
          denom: 'clst',
          exponent: 6
        }
      ],
      base: 'cw20:juno1ngww7zxak55fql42wmyqrr4rhzpne24hhs4p3w4cwhcdgqgr3hxsmzl9zg',
      name: 'Celestims',
      display: 'clst',
      symbol: 'CLST',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/celestims.png'
      }
    },
    {
      description:
        'A revolutionary DAO created to bring clean drinking water to men, women, and children worldwide. We hope you join us on our journey!',
      type_asset: 'cw20',
      address: 'juno1m4h8q4p305wgy7vkux0w6e5ylhqll3s6pmadhxkhqtuwd5wlxhxs8xklsw',
      denom_units: [
        {
          denom: 'cw20:juno1m4h8q4p305wgy7vkux0w6e5ylhqll3s6pmadhxkhqtuwd5wlxhxs8xklsw',
          exponent: 0
        },
        {
          denom: 'watr',
          exponent: 6
        }
      ],
      base: 'cw20:juno1m4h8q4p305wgy7vkux0w6e5ylhqll3s6pmadhxkhqtuwd5wlxhxs8xklsw',
      name: 'WATR',
      display: 'watr',
      symbol: 'WATR',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/watr.png'
      }
    },
    {
      description: 'An innovative DAO dedicated to housing the most vulnerable',
      type_asset: 'cw20',
      address: 'juno1ju8k8sqwsqu5k6umrypmtyqu2wqcpnrkf4w4mntvl0javt4nma7s8lzgss',
      denom_units: [
        {
          denom: 'cw20:juno1ju8k8sqwsqu5k6umrypmtyqu2wqcpnrkf4w4mntvl0javt4nma7s8lzgss',
          exponent: 0
        },
        {
          denom: 'casa',
          exponent: 6
        }
      ],
      base: 'cw20:juno1ju8k8sqwsqu5k6umrypmtyqu2wqcpnrkf4w4mntvl0javt4nma7s8lzgss',
      name: 'Casa',
      display: 'casa',
      symbol: 'CASA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/casa.png'
      }
    },
    {
      description: 'Social Impact DAO providing showers, meals, and vehicles to the homeless',
      type_asset: 'cw20',
      address: 'juno1j4ux0f6gt7e82z7jdpm25v4g2gts880ap64rdwa49989wzhd0dfqed6vqm',
      denom_units: [
        {
          denom: 'cw20:juno1j4ux0f6gt7e82z7jdpm25v4g2gts880ap64rdwa49989wzhd0dfqed6vqm',
          exponent: 0
        },
        {
          denom: 'summit',
          exponent: 6
        }
      ],
      base: 'cw20:juno1j4ux0f6gt7e82z7jdpm25v4g2gts880ap64rdwa49989wzhd0dfqed6vqm',
      name: 'Summit',
      display: 'summit',
      symbol: 'SUMMIT',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/summit.png'
      }
    },
    {
      description: 'Social Impact DAO dedicated to combatting food insecurity and malnutrition',
      type_asset: 'cw20',
      address: 'juno13ca2g36ng6etcfhr9qxx352uw2n5e92np54thfkm3w3nzlhsgvwsjaqlyq',
      denom_units: [
        {
          denom: 'cw20:juno13ca2g36ng6etcfhr9qxx352uw2n5e92np54thfkm3w3nzlhsgvwsjaqlyq',
          exponent: 0
        },
        {
          denom: 'manna',
          exponent: 6
        }
      ],
      base: 'cw20:juno13ca2g36ng6etcfhr9qxx352uw2n5e92np54thfkm3w3nzlhsgvwsjaqlyq',
      name: 'Manna',
      display: 'manna',
      symbol: 'MANNA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/manna.png'
      }
    },
    {
      description: 'Social Impact DAO focused on youth empowerment',
      type_asset: 'cw20',
      address: 'juno12etxwkxvms0uy9ak8g3pyq6a53myukufdnx82pakzmjmpm77a0ksr9gs5v',
      denom_units: [
        {
          denom: 'cw20:juno12etxwkxvms0uy9ak8g3pyq6a53myukufdnx82pakzmjmpm77a0ksr9gs5v',
          exponent: 0
        },
        {
          denom: 'empwr',
          exponent: 6
        }
      ],
      base: 'cw20:juno12etxwkxvms0uy9ak8g3pyq6a53myukufdnx82pakzmjmpm77a0ksr9gs5v',
      name: 'EMPWR',
      display: 'empwr',
      symbol: 'EMPWR',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/empwr.png'
      }
    },
    {
      description: 'Join us in fighting against world hunger',
      type_asset: 'cw20',
      address: 'juno1525fuspletvzykpgr2atxpymu9le4mghd7qq4a4u23uwqzc2f3fq7fmafd',
      denom_units: [
        {
          denom: 'cw20:juno1525fuspletvzykpgr2atxpymu9le4mghd7qq4a4u23uwqzc2f3fq7fmafd',
          exponent: 0
        },
        {
          denom: 'middle',
          exponent: 6
        }
      ],
      base: 'cw20:juno1525fuspletvzykpgr2atxpymu9le4mghd7qq4a4u23uwqzc2f3fq7fmafd',
      name: 'Middle',
      display: 'middle',
      symbol: 'MIDDLE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/middle.png'
      }
    },
    {
      description: 'Social Impact DAO taking a wholistic approach to helping abused and mentally ill women and children',
      type_asset: 'cw20',
      address: 'juno17703kcxtsg37hryxnestejyyycuv5yyvnghp2e7w0kqvafnnyetsgzq62w',
      denom_units: [
        {
          denom: 'cw20:juno17703kcxtsg37hryxnestejyyycuv5yyvnghp2e7w0kqvafnnyetsgzq62w',
          exponent: 0
        },
        {
          denom: 'sunset',
          exponent: 6
        }
      ],
      base: 'cw20:juno17703kcxtsg37hryxnestejyyycuv5yyvnghp2e7w0kqvafnnyetsgzq62w',
      name: 'Sunset',
      display: 'sunset',
      symbol: 'SUNSET',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sunset.png'
      }
    },
    {
      description: 'Social Impact DAO dedicated to helping restore and protect our environment',
      type_asset: 'cw20',
      address: 'juno1uu3rxu7w7fpfj4sl4xpxppgymk57mzdzn6kg7492jdxh5dwk7d2qq9429e',
      denom_units: [
        {
          denom: 'cw20:juno1uu3rxu7w7fpfj4sl4xpxppgymk57mzdzn6kg7492jdxh5dwk7d2qq9429e',
          exponent: 0
        },
        {
          denom: 'tree',
          exponent: 6
        }
      ],
      base: 'cw20:juno1uu3rxu7w7fpfj4sl4xpxppgymk57mzdzn6kg7492jdxh5dwk7d2qq9429e',
      name: 'Living Tree',
      display: 'tree',
      symbol: 'TREE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/livingtree.png'
      }
    },
    {
      description: "Evmos Guardians' Invaders DAO token.",
      type_asset: 'cw20',
      address: 'juno1jwdy7v4egw36pd84aeks3ww6n8k7zhsumd4ac8q5lts83ppxueus4626e8',
      denom_units: [
        {
          denom: 'cw20:juno1jwdy7v4egw36pd84aeks3ww6n8k7zhsumd4ac8q5lts83ppxueus4626e8',
          exponent: 0
        },
        {
          denom: 'invdrs',
          exponent: 6
        }
      ],
      base: 'cw20:juno1jwdy7v4egw36pd84aeks3ww6n8k7zhsumd4ac8q5lts83ppxueus4626e8',
      name: 'Invaders',
      display: 'invdrs',
      symbol: 'INVDRS',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/invdrs.png'
      }
    },
    {
      description: 'Apemos',
      type_asset: 'cw20',
      address: 'juno1jrr0tuuzxrrwcg6hgeqhw5wqpck2y55734e7zcrp745aardlp0qqg8jz06',
      denom_units: [
        {
          denom: 'cw20:juno1jrr0tuuzxrrwcg6hgeqhw5wqpck2y55734e7zcrp745aardlp0qqg8jz06',
          exponent: 0
        },
        {
          denom: 'apemos',
          exponent: 6
        }
      ],
      base: 'cw20:juno1jrr0tuuzxrrwcg6hgeqhw5wqpck2y55734e7zcrp745aardlp0qqg8jz06',
      name: 'Apemos',
      display: 'apemos',
      symbol: 'APEMOS',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/apemos.png'
      }
    },
    {
      description: 'The First Doge on Osmosis',
      type_asset: 'cw20',
      address: 'juno1ytymtllllsp3hfmndvcp802p2xmy5s8m59ufel8xv9ahyxyfs4hs4kd4je',
      denom_units: [
        {
          denom: 'cw20:juno1ytymtllllsp3hfmndvcp802p2xmy5s8m59ufel8xv9ahyxyfs4hs4kd4je',
          exponent: 0
        },
        {
          denom: 'osdoge',
          exponent: 6
        }
      ],
      base: 'cw20:juno1ytymtllllsp3hfmndvcp802p2xmy5s8m59ufel8xv9ahyxyfs4hs4kd4je',
      name: 'Osmosis Doge',
      display: 'osdoge',
      symbol: 'OSDOGE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/osdoge.png'
      }
    },
    {
      description: 'Doge Apr',
      type_asset: 'cw20',
      address: 'juno1k2ruzzvvwwtwny6gq6kcwyfhkzahaunp685wmz4hafplduekj98q9hgs6d',
      denom_units: [
        {
          denom: 'cw20:juno1k2ruzzvvwwtwny6gq6kcwyfhkzahaunp685wmz4hafplduekj98q9hgs6d',
          exponent: 0
        },
        {
          denom: 'doga',
          exponent: 6
        }
      ],
      base: 'cw20:juno1k2ruzzvvwwtwny6gq6kcwyfhkzahaunp685wmz4hafplduekj98q9hgs6d',
      name: 'Doge Apr',
      display: 'doga',
      symbol: 'DOGA',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/doga.png'
      }
    },
    {
      description: 'Osmo Pepe',
      type_asset: 'cw20',
      address: 'juno1zqrj3ta4u7ylv0wqzd8t8q3jrr9rdmn43zuzp9zemeunecnhy8fss778g7',
      denom_units: [
        {
          denom: 'cw20:juno1zqrj3ta4u7ylv0wqzd8t8q3jrr9rdmn43zuzp9zemeunecnhy8fss778g7',
          exponent: 0
        },
        {
          denom: 'pepe',
          exponent: 6
        }
      ],
      base: 'cw20:juno1zqrj3ta4u7ylv0wqzd8t8q3jrr9rdmn43zuzp9zemeunecnhy8fss778g7',
      name: 'Osmo Pepe',
      display: 'pepe',
      symbol: 'PEPE',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/pepe.png'
      }
    },
    {
      description: 'Catmos',
      type_asset: 'cw20',
      address: 'juno1f5datjdse3mdgrapwuzs3prl7pvxxht48ns6calnn0t77v2s9l8s0qu488',
      denom_units: [
        {
          denom: 'cw20:juno1f5datjdse3mdgrapwuzs3prl7pvxxht48ns6calnn0t77v2s9l8s0qu488',
          exponent: 0
        },
        {
          denom: 'catmos',
          exponent: 6
        }
      ],
      base: 'cw20:juno1f5datjdse3mdgrapwuzs3prl7pvxxht48ns6calnn0t77v2s9l8s0qu488',
      name: 'Catmos',
      display: 'catmos',
      symbol: 'CATMOS',
      logo_URIs: {
        png: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/catmos.png'
      }
    }
  ]
};

const mainnetAssets = [juno_assets];
const testnetAssets = [juno_testnet_assets, injective_testnet_assets, archway_testnet_assets, neutron_testnet_assets];

const assets = isTestnet ? testnetAssets : mainnetAssets;

export default assets;

export const getDefaultFee = (chain: Chain) => {
  const { average_gas_price, denom } = chain.fees!.fee_tokens[0];
  const assetInfo = chain.assets.assets.find((asset) => asset.base === denom);
  if (!assetInfo) throw new Error('Fee asset info not found');
  const denomUnit = assetInfo.denom_units.find((u) => u.denom === assetInfo.display);
  if (!denomUnit) throw new Error('Fee denom unit not found');

  return {
    exponent: denomUnit.exponent as number,
    averageGasPrice: average_gas_price as number,
    udenom: assetInfo.base,
    symbol: assetInfo.symbol,
    img: assetInfo.logo_URIs?.svg || assetInfo.logo_URIs?.png || assetInfo.logo_URIs?.jpeg,
    coingeckoId: assetInfo.coingecko_id
  };
};
