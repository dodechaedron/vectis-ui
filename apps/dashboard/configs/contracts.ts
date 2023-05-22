// FACTORIES
const junotestnet_factory = process.env.NEXT_PUBLIC_JUNO_FACTORY_ADDRESS;
const injectivetestnet_factory = process.env.NEXT_PUBLIC_INJECTIVE_FACTORY_ADDRESS;
const neutrontestnet_factory = process.env.NEXT_PUBLIC_NEUTRON_FACTORY_ADDRESS;
const archwaytestnet_factory = process.env.NEXT_PUBLIC_ARCHWAY_FACTORY_ADDRESS;

// PLUGIN REGISTRY
const junotestnet_plugin_registry = process.env.NEXT_PUBLIC_JUNO_PLUGIN_REGISTRY_ADDRESS;
const injectivetestnet_plugin_registry = process.env.NEXT_PUBLIC_INJECTIVE_PLUGIN_REGISTRY_ADDRESS;
const neutrontestnet_plugin_registry = process.env.NEXT_PUBLIC_NEUTRON_PLUGIN_REGISTRY_ADDRESS;
const archwaytestnet_plugin_registry = process.env.NEXT_PUBLIC_ARCHWAY_PLUGIN_REGISTRY_ADDRESS;

const addresses = {
  juno: {
    factoryAddress: junotestnet_factory,
    pluginRegistryAddress: junotestnet_plugin_registry
  },
  junotestnet: {
    factoryAddress: junotestnet_factory,
    pluginRegistryAddress: junotestnet_plugin_registry
  },
  injectivetestnet: {
    factoryAddress: injectivetestnet_factory,
    pluginRegistryAddress: injectivetestnet_plugin_registry
  },
  neutrontestnet: {
    factoryAddress: neutrontestnet_factory,
    pluginRegistryAddress: neutrontestnet_plugin_registry
  },
  archwaytestnet: {
    factoryAddress: archwaytestnet_factory,
    pluginRegistryAddress: archwaytestnet_plugin_registry
  }
};

export const getContractAddresses = (chainName: string) => {
  return addresses[chainName];
};
