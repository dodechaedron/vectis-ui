import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import DrawerAccounts from '../DrawerAccounts';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const AccountSidebar: React.FC<Props> = ({ isOpen, close }) => {
  if (!isOpen) return <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}></AnimatePresence>;
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      <motion.div
        onClick={close}
        className={clsx('fixed top-0 z-50 flex h-screen w-screen items-center justify-center p-4 backdrop-blur-lg')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={clsx('fixed z-[60] flex h-[calc(100vh-72px)] w-[90vw] flex-col bg-white transition-all md:max-w-[30rem] lg:rounded-r-lg')}
        initial={{ left: '-100vw', top: '72px' }}
        animate={{ left: '0', top: '72px' }}
        exit={{ left: '-100vw', top: '72px' }}
      >
        <DrawerAccounts showCreateAccount />
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountSidebar;
