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
          className="flex w-full max-w-5xl flex-col gap-8 rounded-lg bg-white p-4 md:p-8"
          variants={modalDropIn}
          initial={modalDropIn.hidden}
          animate={modalDropIn.visible}
          exit={modalDropIn.exit}
        >
          <div className="relative w-full transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            {title && <h3 className="text-center text-lg font-medium leading-6 text-gray-700 sm:text-left">{title}</h3>}
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button type="button" className="rounded-md bg-white text-gray-400 focus:outline-none hover:text-gray-500" onClick={closeModal}>
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
