import React, { PropsWithChildren, useCallback, useState } from "react";
import { useRouter } from "next/router";

import * as Sentry from "@sentry/nextjs";

import { useTranslations } from "./TranslationProvider";

interface ModalStatus {
  showModal: (modalName: "send" | "charge") => void;
  hideModal: () => void;
  showErrorModal: (err: unknown) => void;
  isModalVisible: boolean;
  activeModal?: "send" | "charge";
}

const ModalContext = React.createContext<ModalStatus | null>(null);

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { push: goToPage } = useRouter();
  const { language } = useTranslations();
  const [activeModal, setSelectedModal] = useState<"send" | "charge">();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onLoad = useCallback(() => {
    const closeButton = window.document.querySelector(".sentry-error-embed .close");
    if (!closeButton) return;
    const handlerOnClose = () => {
      goToPage("/dashboard");
      closeButton.removeEventListener("click", handlerOnClose);
    };
    closeButton.addEventListener("click", handlerOnClose);
  }, []);

  const showErrorModal = useCallback(
    (err: unknown) => {
      Sentry.captureException(err);
      Sentry.showReportDialog({
        onLoad,
        lang: language,
      });
    },
    [language]
  );

  const showModal = useCallback(
    (modalName: "send" | "charge") => {
      setSelectedModal(modalName);
      setIsModalVisible(true);
    },
    [setSelectedModal, setIsModalVisible]
  );

  const hideModal = useCallback(() => setIsModalVisible(false), [setIsModalVisible]);

  return (
    <ModalContext.Provider value={{ showModal, showErrorModal, hideModal, activeModal, isModalVisible }}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");

  return context;
};
