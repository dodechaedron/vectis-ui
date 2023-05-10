import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useApp } from '~/providers';
import { useToast } from '~/hooks';

import { Input } from './Inputs';
import Spinner from './Spinner';

import { CheckIcon, InformationCircleIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FiExternalLink } from 'react-icons/fi';

import { WalletInfo } from '@vectis/types/Proxy.types';

interface Props {
  walletInfo: WalletInfo;
}

const SettingsAccount: React.FC<Props> = ({ walletInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const { vectis } = useApp();
  const { toast } = useToast();
  const { query } = useRouter();

  const updateName = async () => {
    const promise = vectis.proxyUpdateLabel(query.address as string, newName);
    await toast.promise(promise);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!walletInfo) return;
    setNewName(walletInfo.label);
  }, [walletInfo]);

  if (!walletInfo) return <Spinner />;

  return (
    <>
      <div className="flex h-32 items-center gap-10 rounded-md bg-white p-6 shadow-sm">
        <div className="flex w-full flex-col gap-2">
          <h4 className="flex items-center gap-2 text-lg font-semibold">
            Safe nonce
            <span>
              <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
            </span>
          </h4>
          <p>
            Current nonce: <span>{walletInfo.nonce}</span>
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <h4 className="text-lg font-semibold">Contract Version</h4>
          <Link
            target="_blank"
            href={`https://github.com/nymlab/vectis/releases/tag/v${walletInfo.version.version}`}
            className="group flex items-center gap-1 text-lg font-semibold text-kashmir-blue-500 hover:text-gray-500 "
          >
            {walletInfo.version.version}
            <span>
              <FiExternalLink className="h-4 w-4 text-kashmir-blue-500 group-hover:text-gray-500" />
            </span>
          </Link>
        </div>
      </div>
      {/* label */}
      <div className="flex h-full flex-col items-center justify-start gap-10 rounded-md bg-white p-6 shadow-sm md:h-32 md:flex-row">
        <div className="flex w-full flex-col">
          <h4 className="w-full text-lg font-semibold">Manage Name </h4>
          <p className="text-sm text-gray-400">This name represent a easy way to identify this account from the other ones</p>
        </div>
        <div className="flex w-full items-end justify-start gap-2">
          <Input label="Account name" value={newName} onChange={(e) => setNewName(e.target.value)} disabled={!isEditing} />
          <div className="flex h-10 w-20 items-center gap-2">
            {!isEditing ? (
              <PencilIcon className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-900" onClick={() => setIsEditing(true)} />
            ) : (
              <>
                <CheckIcon className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-900" onClick={updateName} />
                <XMarkIcon
                  className="h-7 w-7 cursor-pointer text-gray-500 hover:text-gray-900"
                  onClick={() => [setNewName(walletInfo.label), setIsEditing(!isEditing)]}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAccount;
