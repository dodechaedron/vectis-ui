import React, { useMemo } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { useSidebar } from '~/providers/SidebarProvider';

import ChainSidebar from './ChainSidebar';

const sidebars = {
  chains: ChainSidebar
};

const GlobalSidebar: React.FC = () => {
  const { hideSidebar, activeSidebar, isSidebarVisible } = useSidebar();

  const Sidebar = useMemo(() => sidebars[activeSidebar as keyof typeof sidebars], [activeSidebar]);

  if (!isSidebarVisible) return <AnimatePresence initial={false} mode="wait" onExitComplete={() => null} />;

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      <motion.div
        onClick={hideSidebar}
        className={clsx({ 'fixed top-0 z-40 flex h-screen w-screen items-center justify-center p-4 backdrop-blur-lg ': isSidebarVisible })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Sidebar ? <Sidebar /> : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSidebar;
