import React, { Dispatch, useRef } from 'react';
import { useClickAway } from 'react-use';

import { Button } from '../Buttons';

interface WalletModalProps {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
  walletRepo?: {
    connect: (walletName?: string, sync?: boolean) => Promise<void>;
  };
}

const ModalWallet: React.FC<WalletModalProps> = ({ walletRepo, setOpen, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleConnect = async (walletName?: string) => {
    if (!walletRepo) return;
    await walletRepo.connect(walletName);
    setOpen(false);
  };

  useClickAway(modalRef, () => setOpen(false));

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex h-screen w-screen flex-col items-center justify-center bg-stone-700/50 backdrop-blur-lg">
      <div ref={modalRef} className="flex w-full max-w-[480px] flex-col gap-8 rounded-3xl bg-white p-4 md:p-10">
        <h2 className="text-4xl font-bold">Choose your wallet</h2>

        <Button onClick={() => handleConnect('vectis-extension')}>Vectis</Button>
        <Button onClick={() => handleConnect('keplr-extension')}>Keplr</Button>
      </div>
    </div>
  );
};

export default ModalWallet;
