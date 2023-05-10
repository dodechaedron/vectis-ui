import React, { Dispatch, ReactElement, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { desktopWallets } from '~/configs/wallets';

import { Button } from '../Buttons';
import VectisIcon from '../Icons/VectisIcon';

import AvailableWallet from './ConnectWalletModal/AvailableWallet';
import ConectingWallet from './ConnectWalletModal/ConectingWallet';
import SuccessConnect from './ConnectWalletModal/SuccessConnected';
import { modalDropIn } from './Modal';

import { BiRightArrow } from 'react-icons/bi';
import { FaChrome, FaEdge, FaFirefoxBrowser, FaLaptop, FaOpera, FaSafari } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

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
            {/* <AvailableWallet /> */}
            {/* <ConectingWallet selectedWallet={desktopWallets[0]} /> */}
            <SuccessConnect />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalWallet;
