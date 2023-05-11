import { Endpoints } from '~/interfaces';

const injective_testnet = {
  indexer: 'https://k8s.testnet.exchange.grpc-web.injective.network',
  grpcUrl: 'https://k8s.testnet.chain.grpc-web.injective.network',
  rpcUrl: 'https://k8s.testnet.tm.injective.network',
  restUrl: 'https://k8s.testnet.lcd.injective.network',
  chronos: 'https://k8s.testnet.exchange.grpc-web.injective.network',
  explorer: 'https://k8s.testnet.explorer.grpc-web.injective.network'
};

export const getEndpoints = (chainName: string): Endpoints => {
  if (chainName === 'injectivetestnet') return injective_testnet;

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
