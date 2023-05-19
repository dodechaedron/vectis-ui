import { Endpoints } from '~/interfaces';

const custom_endpoints = {
  injectivetestnet: {
    indexer: 'https://k8s.testnet.exchange.grpc-web.injective.network',
    grpcUrl: 'https://k8s.testnet.chain.grpc-web.injective.network',
    rpcUrl: 'https://k8s.testnet.tm.injective.network',
    restUrl: 'https://k8s.testnet.lcd.injective.network',
    chronos: 'https://k8s.testnet.exchange.grpc-web.injective.network',
    explorer: 'https://k8s.testnet.explorer.grpc-web.injective.network'
  },
  archwaytestnet: {
    rpcUrl: 'https://rpc.constantine.archway.tech',
    restUrl: 'https://api.constantine.archway.tech',
    grpUrl: 'grpc.constantine.archway.tech:443'
  },
  neutrontestnet: {
    rpcUrl: 'https://rpc-palvus.pion-1.ntrn.tech',
    restUrl: 'https://rest-palvus.pion-1.ntrn.tech',
    grpUrl: 'grpc-palvus.pion-1.ntrn.tech:80'
  }
};

export const getEndpoints = (chainName: string): Endpoints => {
  const customEndpoints = custom_endpoints[chainName];
  if (customEndpoints) return customEndpoints;

  const domain = chainName.includes('testnet') ? 'testcosmos.directory' : 'cosmos.directory';
  const explorerDomain = chainName.includes('testnet')
    ? `https://testnet.mintscan.io/${chainName.replace('testnet', '-testnet')}`
    : `https://mintscan.io/${chainName}`;

  return {
    rpcUrl: `https://rpc.${domain}/${chainName}`,
    restUrl: `https://rest.${domain}/${chainName}`,
    explorer: explorerDomain,
    grpcUrl: ''
  };
};
