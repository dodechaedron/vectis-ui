import { useVectis } from '~/providers';

import LockIcon from './Icons/Lock';
import AccountList from './AccountList';
import { Button } from './Buttons';

const DrawerAccounts: React.FC = () => {
  const { connect, isWalletConnected } = useVectis();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200  py-5 px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Vectis Accounts</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Preview of your accounts</p>
      </div>
      <div className="right-sidebar h-full overflow-y-auto py-4 px-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-kashmir-blue-300 scrollbar-thumb-rounded-full hover:scrollbar-thumb-kashmir-blue-400">
        {isWalletConnected ? (
          <AccountList />
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
