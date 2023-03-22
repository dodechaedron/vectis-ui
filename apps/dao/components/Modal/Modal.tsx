import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const modalDropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface Props {
  title: string;
  subtitle?: string;
}

const Modal: React.FC<PropsWithChildren<Props>> = ({ children, title, subtitle }) => {
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="flex w-full max-w-[480px] flex-col gap-8 rounded-3xl bg-white p-4 md:p-10"
      variants={modalDropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold">{title}</h2>
        {subtitle ? <p className="text-qs-grey-25 text-sm">{subtitle}</p> : null}
      </div>
      {children}
    </motion.div>
  );
};

export default Modal;
