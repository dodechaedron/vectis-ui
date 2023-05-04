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

const assets = [juno_testnet_assets, injective_testnet_assets];

export default assets;
