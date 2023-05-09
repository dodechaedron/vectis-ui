import React, { Dispatch, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../Buttons';

import { modalDropIn } from './Modal';

interface WalletModalProps {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
  walletRepo?: {
    connect: (walletName?: string, sync?: boolean) => Promise<void>;
  };
}

const ModalWallet: React.FC<WalletModalProps> = ({ walletRepo, setOpen, isOpen }) => {
  const handleConnect = async (walletName?: string) => {
    if (!walletRepo) return;
    await walletRepo.connect(walletName);
    setOpen(false);
  };

  if (!isOpen) return <AnimatePresence initial={false} mode="wait" onExitComplete={() => null} />;

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      <motion.div
        onClick={() => setOpen(false)}
        className="fixed top-0 z-[60] flex h-screen w-screen items-center justify-center p-4 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex w-full max-w-xl flex-col gap-8 rounded-lg bg-white p-4 md:p-8"
          variants={modalDropIn}
          initial={modalDropIn.hidden}
          animate={modalDropIn.visible}
          exit={modalDropIn.exit}
        >
          <h2 className="text-4xl font-bold">Choose your wallet</h2>

          <Button onClick={() => handleConnect('vectis-extension')}>Vectis</Button>
          <Button onClick={() => handleConnect('keplr-extension')}>Keplr</Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalWallet;
