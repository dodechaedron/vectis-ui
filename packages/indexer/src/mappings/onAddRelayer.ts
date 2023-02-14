import { CosmosEvent } from '@subql/types-cosmos';
import { Wallet } from '../types';

export async function onAddRelayer({ event, msg }: CosmosEvent): Promise<void> {
  const { value: address } = event.attributes.find((attr) => attr.key === 'address');
  const { value: walletId } = event.attributes.find((attr) => attr.key === '_contract_address');

  const wallet = await Wallet.get(walletId);
  wallet.relayers = [...wallet.relayers, address];
  await wallet.save();
}
