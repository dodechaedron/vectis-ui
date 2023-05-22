import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import AvailableWallet from './ConnectWalletModal/AvailableWallet';
import ConectingWallet from './ConnectWalletModal/ConectingWallet';
import SuccessConnect from './ConnectWalletModal/SuccessConnected';
import { modalDropIn } from './Modal';

import { IoClose } from 'react-icons/io5';

import { ChainWalletBase } from '@cosmos-kit/core/types/bases/chain-wallet';
import { WalletModalProps } from '@cosmos-kit/core/types/types/view';

const ModalWallet: React.FC<WalletModalProps> = ({ walletRepo, setOpen, isOpen }) => {
  const [wallet, setWallet] = useState<ChainWalletBase>();

  useEffect(() => {
    if (!isOpen && wallet?.isWalletConnecting) {
      wallet.disconnect();
      setWallet(undefined);
    }
  }, [isOpen]);

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
          className=" flex w-full max-w-xl flex-col rounded-lg bg-white p-4 md:p-8"
          variants={modalDropIn}
          initial={modalDropIn.hidden}
          animate={modalDropIn.visible}
          exit={modalDropIn.exit}
        >
          <button className="group mb-2 self-end" onClick={() => setOpen(false)}>
            <IoClose className="h-6 w-6 fill-gray-500 group-hover:fill-gray-700" />
          </button>
          <div className="flex flex-col gap-8">
            {walletRepo ? (
              <>
                {!wallet && <AvailableWallet walletRepo={walletRepo} setWallet={(w) => setWallet(w)} />}
                <ConectingWallet wallet={wallet} />
                <SuccessConnect wallet={wallet} />
              </>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalWallet;
