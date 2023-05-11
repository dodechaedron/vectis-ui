import React, { useState, useCallback, PropsWithChildren } from "react";

export enum ModalTypes {
  Stake = "stake",
  Unstake = "unstake",
  QR = "qr",
}

interface ModalStatus {
  showModal: (modalName: ModalTypes, modalProps?: unknown) => void;
  hideModal: () => void;
  isModalVisible: boolean;
  activeModal?: ModalTypes;
}

const ModalContext = React.createContext<ModalStatus | null>(null);

export const ModalProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [activeModal, setSelectedModal] = useState<ModalTypes>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(
    (modalName: ModalTypes) => {
      setSelectedModal(modalName);
      setIsModalVisible(true);
    },
    [setSelectedModal, setIsModalVisible]
  );

  const hideModal = useCallback(() => setIsModalVisible(false), [setIsModalVisible]);

  return <ModalContext.Provider value={{ showModal, hideModal, isModalVisible, activeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");

  return context;
};
