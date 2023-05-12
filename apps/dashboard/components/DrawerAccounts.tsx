import { useState } from 'react';
import clsx from 'clsx';

import { useVectis } from '~/providers';
import useMediaQuery from '~/hooks/useMediaQuery';

import LockIcon from './Icons/Lock';
import AccountList from './AccountList';
import { Button } from './Buttons';

import { IoIosArrowDown } from 'react-icons/io';

interface Props {
  showCreateAccount?: boolean;
  canCollapse?: boolean;
}

const DrawerAccounts: React.FC<Props> = ({ showCreateAccount, canCollapse }) => {
  const { connect, isWalletConnected } = useVectis();
  const isLg = useMediaQuery('lg');
  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const shouldCollapse = canCollapse && !isLg;

  return (
    <div
      className={clsx(
        'flex  flex-col rounded-md bg-white transition-all',
        shouldCollapse && isCollapse ? '!h-[89px] overflow-hidden' : ' h-full'
      )}
    >
      <div
        className={clsx('flex items-center  justify-between border-b border-gray-200 py-5 px-6', { 'cursor-pointer': shouldCollapse })}
        onClick={() => {
          shouldCollapse && setIsCollapse(!isCollapse);
        }}
      >
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Vectis Accounts</h3>
          <p className="mt-1 text-sm text-gray-500">Preview of your accounts</p>
        </div>
        {shouldCollapse && <IoIosArrowDown className={clsx('h-5 w-5 transition-all', shouldCollapse && isCollapse ? '' : 'rotate-180')} />}
      </div>
      <div
        className={clsx(
          'right-sidebar h-full overflow-y-auto py-4 px-6 transition-all duration-1000 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-kashmir-blue-300 scrollbar-thumb-rounded-full hover:scrollbar-thumb-kashmir-blue-400'
        )}
      >
        {isWalletConnected ? (
          <AccountList showCreateAccount={showCreateAccount} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="rounded-lg bg-kashmir-blue-200 p-4">
              <LockIcon />
            </div>
            <p className="font-semibold">Connect your wallet to see your accounts</p>
            <Button className="w-full" onClick={connect}>
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawerAccounts;
