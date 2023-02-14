import { CosmosEvent } from '@subql/types-cosmos';
import { GuardianGroup } from '../types';
import { v4 as uuidv4 } from 'uuid';

export async function onUpdateGuardian({ event, msg }: CosmosEvent): Promise<void> {
  const { value: guaridans } = event.attributes.find((attr) => attr.key === 'guaridans');
  const { value: walletId } = event.attributes.find((attr) => attr.key === '_contract_address');

  const [g] = await GuardianGroup.getByWalletId(walletId);
  await GuardianGroup.remove(g.id);

  const guardian = GuardianGroup.create({
    id: uuidv4(),
    walletId: walletId,
    guardians: JSON.parse(guaridans),
    multisig_code_id: 0,
    multisig_address: '',
    created_at: new Date()
  });

  await guardian.save();
}
