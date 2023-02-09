import { CosmosEvent } from '@subql/types-cosmos';
import { GuardianGroup } from '../types';

export async function onReplyMultisigInstantiate({ event, msg }: CosmosEvent): Promise<void> {
  const { value: multisig_address } = event.attributes.find((attr) => attr.key === 'multisig_address');
  const { value: multisig_code_id } = event.attributes.find((attr) => attr.key === 'multisig_code_id');
  const { value: walletId } = event.attributes.find((attr) => attr.key === '_contract_address');

  const [guardians] = await GuardianGroup.getByWalletId(walletId);
  guardians.multisig_address = multisig_address;
  guardians.multisig_code_id = parseInt(multisig_code_id);
  await guardians.save();
}
