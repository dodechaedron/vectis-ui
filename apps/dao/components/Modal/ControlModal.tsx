import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalTypes, useModal } from "~/providers/ModalProvider";
import ModalStake from "./ModalStake";
import ModalUnstake from "./ModalUnstake";

const modals = {
  [ModalTypes.Stake]: ModalStake,
  [ModalTypes.Unstake]: ModalUnstake,
};

const ControlModal: React.FC = () => {
  const { activeModal, isModalVisible, hideModal } = useModal();
  const Modal = useMemo(() => modals[activeModal as unknown as keyof typeof modals], [activeModal]);

  if (!isModalVisible || !activeModal) return null;

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      <motion.div
        onClick={hideModal}
        className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center p-4 backdrop-blur-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modal />
      </motion.div>
    </AnimatePresence>
  );
};

export default ControlModal;
