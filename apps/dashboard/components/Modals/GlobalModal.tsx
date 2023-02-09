import React, { useCallback, useMemo,useState } from "react";

import { useModal } from "~/providers";

import ChargeModal from "~/components/Modals/ChargeModal";
import SendModal from "~/components/Modals/SendModal";

const modals = {
  send: SendModal,
  charge: ChargeModal,
};

const GlobalModal: React.FC = () => {
  const { activeModal, isModalVisible } = useModal();
  const Modal = useMemo(() => modals[activeModal as keyof typeof modals], [activeModal]);

  if (!isModalVisible || !activeModal) return null;

  return <Modal />;
};

export default GlobalModal;
