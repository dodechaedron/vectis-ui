import React from 'react';
import { useRouter } from 'next/router';

import { copyToClipboard, IntlAddress } from '~/services/browser';
import { useModal, useVectis } from '~/providers';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { HiOutlineWallet } from 'react-icons/hi2';
import { IoMdCheckmark, IoMdCopy } from 'react-icons/io';
import { MdFileCopy, MdOutlineKeyboardArrowRight, MdOutlineQrCode2, MdOutlineSettings } from 'react-icons/md';

interface Props {
  seeAccounts: () => void;
}

const AccountDisplay: React.FC<Props> = ({ seeAccounts }) => {
  const { endpoints, account } = useVectis();
  const { push: goToPage } = useRouter();
  const { showModal } = useModal();
  const [copyIcon, setCopyIcon] = React.useState(<MdFileCopy className="h-5 w-5 fill-white lg:h-4 lg:w-4" />);

  const handleCopy = () => {
    copyToClipboard(account!.address);
    setCopyIcon(<IoMdCheckmark className="h-5 w-5 fill-white lg:h-4 lg:w-4" />);
    setTimeout(() => {
      return setCopyIcon(<MdFileCopy className="h-5 w-5 fill-white lg:h-4 lg:w-4" />);
    }, 1000);
  };

  return (
    <>
      <div className="group relative flex items-center justify-start gap-2 overflow-hidden bg-kashmir-blue-200 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 font-extrabold uppercase text-kashmir-blue-400">
          <HiOutlineWallet className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold capitalize">{account.label}</p>
          <p className="text-xs text-gray-500">{IntlAddress(account.address, 15)}</p>
          <p className="text-xs text-kashmir-blue-500">0,00 USD</p>
        </div>
        <div
          className="absolute top-0 bottom-0 right-[-1.5rem] m-auto flex h-12 w-14 items-center justify-start rounded-2xl bg-kashmir-blue-500 text-white
    transition-all group-hover:right-[-1rem] group-hover:bg-kashmir-blue-600 md:w-10 "
          onClick={seeAccounts}
        >
          <MdOutlineKeyboardArrowRight className="h-8 w-8 transition-all group-hover:h-8 group-hover:w-8 md:h-5 md:w-5 md:group-hover:h-6 md:group-hover:w-6" />
        </div>
      </div>
      <div className="flex items-center  gap-2 px-4 py-2">
        <div className="cursor-pointer rounded-md bg-gray-400 p-1 hover:bg-gray-500" onClick={() => showModal('qr')}>
          <MdOutlineQrCode2 className="h-5 w-5 fill-white lg:h-4 lg:w-4" />
        </div>
        <div className="cursor-pointer rounded-md bg-gray-400 p-1 hover:bg-gray-500" onClick={handleCopy}>
          {copyIcon}
        </div>
        <div
          className="cursor-pointer rounded-md bg-gray-400 p-1 hover:bg-gray-500"
          onClick={() => window.open(`${endpoints.explorer}/account/${account.address}`)}
        >
          <HiOutlineExternalLink className="h-5 w-5 text-white lg:h-4  lg:w-4" />
        </div>
        <div
          className="cursor-pointer rounded-md bg-gray-400 p-1 hover:bg-gray-500"
          onClick={() => goToPage(`/settings?vectis=${account.address}`)}
        >
          <MdOutlineSettings className="h-5 w-5 text-white lg:h-4  lg:w-4" />
        </div>
      </div>
    </>
  );
};

export default AccountDisplay;
