import React, { useMemo } from 'react';
import Link from 'next/link';

import useMediaQuery from '~/hooks/useMediaQuery';

import VectisIcon from '~/components/Icons/VectisIcon';

import { IconType } from 'react-icons';
import { BiRightArrow } from 'react-icons/bi';
import { FaAndroid, FaApple, FaChrome, FaEdge, FaFirefoxBrowser, FaLaptop, FaOpera, FaSafari } from 'react-icons/fa';

import { ChainWalletBase } from '@cosmos-kit/core/types/bases/chain-wallet';
import { WalletRepo } from '@cosmos-kit/core/types/repository';

const browserIcon = (browser: string | undefined): IconType => {
  switch (browser?.toString().toLowerCase()) {
    case 'firefox':
      return FaFirefoxBrowser;
    case 'edge':
      return FaEdge;
    case 'chrome':
      return FaChrome;
    case 'safari':
      return FaSafari;
    case 'opera':
      return FaOpera;
    case 'android':
      return FaAndroid;
    case 'ios':
      return FaApple;
    default:
      return FaLaptop;
  }
};

interface Props {
  walletRepo: WalletRepo;
  setWallet: (wallet: ChainWalletBase) => void;
}

const AvailableWallet: React.FC<Props> = ({ walletRepo, setWallet }) => {
  const isMd = useMediaQuery('md');

  const wallets = useMemo(() => {
    if (!walletRepo) return [];
    return walletRepo.wallets.filter(({ walletInfo }) => walletInfo.name.includes('mobile') !== isMd);
  }, [walletRepo, isMd]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Available wallets:</h2>
        <div className="flex flex-col gap-2">
          {wallets.map((wallet, i) => {
            const { walletInfo, connect, client } = wallet;

            return (
              <div
                key={`${walletInfo.prettyName}-wallet-${i}`}
                className="group flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-200 p-2 hover:bg-kashmir-blue-200"
                onClick={() => [setWallet(wallet), connect(true)]}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
                    {walletInfo.prettyName.includes('Vectis') ? (
                      <VectisIcon className="h-12 w-12 fill-white" />
                    ) : (
                      <img src={walletInfo.logo} alt={walletInfo.prettyName} className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">{walletInfo.prettyName}</p>
                    <p className="text-xs text-gray-500">{walletInfo.name.includes('mobile') ? 'Mobile Application' : 'Browser Extension'}</p>
                  </div>
                </div>
                <div className="pr-6">
                  <BiRightArrow className="h-4 w-4 text-gray-500 group-hover:text-gray-900" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Download options:</h2>
        <div className="flex flex-col gap-2">
          {wallets.map(({ walletInfo }, i) => {
            return (
              <div
                key={`${walletInfo.prettyName}-wallet-${i}`}
                className=" flex  items-center justify-between gap-4 rounded-lg bg-gray-200 p-2 "
              >
                <div className="flex items-center justify-between gap-2">
                  <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
                    {walletInfo.prettyName.includes('Vectis') ? (
                      <VectisIcon className="h-12 w-12 fill-white" />
                    ) : (
                      <img src={walletInfo.logo} alt={walletInfo.prettyName} className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">{walletInfo.prettyName}</p>
                    <p className="text-xs text-gray-500">{walletInfo.name.includes('mobile') ? 'Mobile Application' : 'Browser Extension'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {walletInfo?.downloads?.map((downloads, i) => {
                    const BrowserIcon = browserIcon(isMd ? downloads.browser : downloads.os);
                    return (
                      <Link
                        key={`wallet-${walletInfo.name}`}
                        className="rounded-md bg-white p-1 hover:bg-gray-100"
                        href={downloads.link}
                        target="_blank"
                      >
                        {<BrowserIcon className="h-5 w-5 fill-kashmir-blue-600" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AvailableWallet;
