import React from 'react';

import { useModal } from '~/providers';

import QRCode from '../QRCode';

import Modal from './Modal';

const QRModal: React.FC = () => {
  const { hideModal, isModalVisible } = useModal();
  return (
    <Modal isModalVisible={isModalVisible} closeModal={hideModal} title="Scan your QRCode">
      <div className="flex flex-1 flex-col items-center justify-center py-4">
        <QRCode />
      </div>
    </Modal>
  );
};

export default QRModal;
