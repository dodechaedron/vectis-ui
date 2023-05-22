import React, { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { XMarkIcon } from '@heroicons/react/24/outline';
interface Props {
  closeModal: () => void;
  isModalVisible: boolean;
  title?: string;
}

export const modalDropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
};

const Modal: React.FC<PropsWithChildren<Props>> = ({ children, isModalVisible, title, closeModal }) => {
  if (!isModalVisible) return <AnimatePresence initial={false} mode="wait" onExitComplete={() => null} />;

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      <motion.div
        onClick={closeModal}
        className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center p-4 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex min-w-[450px] max-w-5xl flex-col gap-8 rounded-lg bg-white p-4 shadow-sm md:p-8"
          variants={modalDropIn}
          initial={modalDropIn.hidden}
          animate={modalDropIn.visible}
          exit={modalDropIn.exit}
        >
          <div className="absolute top-0 left-0 flex w-full justify-between p-4">
            <h3 className="text-xl font-bold leading-6">{title}</h3>
            <button
              type="button"
              className="hidden rounded-md bg-white text-gray-400 focus:outline-none hover:text-gray-500 sm:block"
              onClick={closeModal}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
