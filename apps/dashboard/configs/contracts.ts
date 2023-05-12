// FACTORIES
const junotestnet_factory = process.env.NEXT_PUBLIC_JUNO_FACTORY_ADDRESS;
const injectivetestnet_factory = process.env.NEXT_PUBLIC_INJECTIVE_FACTORY_ADDRESS;

// PLUGIN REGISTRY
const junotestnet_plugin_registry = process.env.NEXT_PUBLIC_JUNO_PLUGIN_REGISTRY_ADDRESS;
const injectivetestnet_plugin_registry = process.env.NEXT_PUBLIC_INJECTIVE_PLUGIN_REGISTRY_ADDRESS;

const addresses = {
  junotestnet: {
    factoryAddress: junotestnet_factory,
    pluginRegistryAddress: junotestnet_plugin_registry
  },
  injectivetestnet: {
    factoryAddress: injectivetestnet_factory,
    pluginRegistryAddress: injectivetestnet_plugin_registry
  }
};

export const getContractAddresses = (chainName: string) => {
  return addresses[chainName];
};
