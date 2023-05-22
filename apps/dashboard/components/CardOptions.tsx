import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useModal, useVectis } from '~/providers';

import { GiReceiveMoney } from 'react-icons/gi';
import { IoIosSettings } from 'react-icons/io';
import { MdSendAndArchive, MdStackedBarChart } from 'react-icons/md';

const CardOptions: React.FC = () => {
  const { push: goToPage } = useRouter();
  const { account } = useVectis();
  const { showModal } = useModal();

  const buttons = useMemo(
    () => [
      {
        text: 'Manage',
        icon: IoIosSettings,
        onClick: () => goToPage(`settings?vectis=${account.address}`)
      },
      {
        text: 'Transfer',
        icon: MdSendAndArchive,
        onClick: () => showModal('send')
      },
      {
        text: 'Top-up',
        icon: GiReceiveMoney,
        onClick: () => showModal('charge')
      },
      {
        text: 'Stake',
        icon: MdStackedBarChart,
        onClick: () => goToPage(`/stake`)
      }
    ],
    [account]
  );

  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-md lg:gap-4 2xl:grid-cols-4 ">
      {buttons.map(({ text, icon: Icon, onClick }) => {
        const isDisabled = text === 'Stake';
        return (
          <button
            disabled={isDisabled}
            className="group flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border bg-white p-2 disabled:cursor-not-allowed disabled:opacity-70 hover:shadow-md disabled:hover:shadow-none"
            onClick={onClick}
            key={`actions-buttons-${text}`}
          >
            <span className="rounded-full bg-kashmir-blue-100/20 p-4 text-kashmir-blue-600 group-disabled:bg-gray-100 group-disabled:text-gray-900">
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-xs">{text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CardOptions;
