const juno_prod = {
  chainId: "juno-1",
  chainName: "Juno",
  addressPrefix: "juno",
  rpcUrl: "https://rpc-juno.itastakers.com/",
  httpUrl: "https://lcd-juno.itastakers.com/",
  feeToken: "ujuno",
  stakingToken: "ujuno",
  coinMap: {
    ujunox: { denom: "JUNO", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
};

export const wasm_testnet = {
  chainId: "malaga-420",
  chainName: "Wasmd Testnet",
  addressPrefix: "wasm",
  rpcUrl: "https://rpc.malaga-420.cosmwasm.com:443",
  httpUrl: "https://api.malaga-420.cosmwasm.com",
  feeToken: "umlg",
  stakingToken: "uand",
  coinMap: {
    umlg: { denom: "MLG", fractionalDigits: 6 },
    uand: { denom: "AND", fractionalDigits: 6 },
  },
  gasPrice: 0.08,
};

const juno_testnet = {
  chainId: "uni-6",
  chainName: "Juno Testnet (uni-6)",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.uni.juno.deuslabs.fi:443/",
  httpUrl: "https://lcd.uni.juno.deuslabs.fi/",
  feeToken: "ujunox",
  stakingToken: "ujunox",
  coinMap: {
    ujunox: { denom: "JUNOX", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
};

const juno_local = {
  chainId: "testing",
  chainName: "Juno Local",
  addressPrefix: "juno",
  rpcUrl: "http://localhost:26657",
  httpUrl: "http://localhost:1317",
  feeToken: "ujunox",
  stakingToken: "ujunox",
  coinMap: {
    ujunox: { denom: "JUNOX", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
};

const networks = {
  juno_prod,
  juno_testnet,
  juno_local,
  wasm_testnet,
};

export default networks[process.env.NEXT_PUBLIC_NETWORK as keyof typeof networks];
