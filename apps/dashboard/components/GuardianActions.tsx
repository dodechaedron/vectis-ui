import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import { Button } from '~/components/Buttons';
import { Input } from '~/components/Inputs';

import GuardianAccountInfo from './GuardianAccountInfo';
import GuardianProposals from './GuardianProposals';

import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { VectisAccount } from '~/interfaces';

interface Props {
  accountInfo?: VectisAccount;
}

const GuardianActions: React.FC<Props> = ({ accountInfo }) => {
  const { vectis } = useVectis();
  const { toast, isLoading } = useToast();
  const queryClient = useQueryClient();

  const [controllerAddr, setControllerAddr] = useState<string>(accountInfo?.controllerAddr || '');

  const { mutateAsync: rotate } = useMutation({
    mutationFn: async () => {
      if (!accountInfo) return;
      const promise = accountInfo?.multisigAddress
        ? vectis.proxyProposeRotateOperation(accountInfo.address, accountInfo.multisigAddress, controllerAddr)
        : vectis.updateControllerAddr(accountInfo.address, controllerAddr);
      return await toast.promise(promise);
    },
    onSuccess: async () => {
      if (accountInfo?.multisigAddress) await queryClient.refetchQueries({ queryKey: ['guardian_proposals'], type: 'all' });
      else await queryClient.refetchQueries({ queryKey: ['accounts_by_guardians'], type: 'all' });
    }
  });

  const { mutateAsync: freeze } = useMutation({
    mutationFn: async () => {
      if (!accountInfo) return;
      const promise = accountInfo.multisigAddress
        ? vectis.proxyProposeFreezeOperation(accountInfo.address, accountInfo.multisigAddress, accountInfo.frozen)
        : vectis.updateFreezeStatus(accountInfo.address);
      return await toast.promise(promise);
    },
    onSuccess: async () => {
      if (accountInfo?.multisigAddress) await queryClient.refetchQueries({ queryKey: ['guardian_proposals'], type: 'all' });
      else await queryClient.refetchQueries({ queryKey: ['accounts_by_guardians'], type: 'all' });
    }
  });

  if (!accountInfo) return null;

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))]">
      <GuardianAccountInfo accountInfo={accountInfo} />
      <div className="flex max-h-[22rem] flex-col rounded-md bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Guardian Actions</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Execute guardianship actions over this account</p>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="flex flex-col gap-2 p-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold">
              Rotate Controller Address
              <span>
                <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
              </span>
            </h4>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input container="flex-1 h-10" value={controllerAddr} onChange={(e) => setControllerAddr(e.target.value)} />
              <Button disabled={isLoading} className="flex-2 h-10 w-full py-1 sm:w-40" onClick={() => rotate()}>
                {accountInfo.multisigAddress ? 'Propose Rotation' : 'Rotate'}
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-2 p-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold">
              {accountInfo.frozen ? 'Unfreeze' : 'Freeze'} Account
              <span>
                <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
              </span>
            </h4>
            <Button disabled={isLoading} className="h-10 w-40 py-2" onClick={() => freeze()}>
              {accountInfo.multisigAddress ? 'Propose ' : ''}
              {accountInfo.frozen ? 'Unfreeze' : 'Freeze'}
            </Button>
          </div>
        </div>
      </div>
      {accountInfo.multisigAddress ? <GuardianProposals accountInfo={accountInfo} /> : null}
    </div>
  );
};

export default GuardianActions;
