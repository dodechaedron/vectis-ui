import { useQuery, useQueryClient } from 'react-query';
import Link from 'next/link';

import { useTranslations, useVectis } from '~/providers';

import SmartAccountCard from '~/components/SmartAccountCard';
import Spinner from '~/components/Spinner';

import { Button } from './Buttons';

import { IoAddCircleOutline } from 'react-icons/io5';

const AccountList: React.FC = () => {
  const { t } = useTranslations();
  const queryClient = useQueryClient();

  const { signingClient, userAddr, connect } = useVectis();
  const { data: accounts, isLoading } = useQuery(['vectis_accounts', userAddr], () => signingClient.getAccounts([userAddr]), {
    enabled: !!signingClient,
    onSuccess: (accounts) => accounts.forEach((account) => queryClient.setQueryData(['vectis_account', account.address], account))
  });

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200  py-5 px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Vectis Accounts</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Preview of your accounts</p>
      </div>
      <div className="right-sidebar h-full overflow-y-auto py-4 px-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-kashmir-blue-300 scrollbar-thumb-rounded-full hover:scrollbar-thumb-kashmir-blue-400">
        {userAddr ? (
          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            {accounts?.map((smartAccount, i) => (
              <SmartAccountCard key={`card-${smartAccount.address}`} smartAccount={smartAccount} />
            ))}
            <Link
              href="/accounts/create"
              passHref={true}
              className="hover:bg-mirage-100/30 border-black-300 mx-auto flex h-[12rem] w-full max-w-[24rem] flex-col items-center justify-center rounded-md border-2 border-dashed py-2 px-3 text-gray-400 transition-all hover:text-gray-700"
              data-testid="create-wallet"
            >
              <IoAddCircleOutline className="text-4xl" />
              <p className="text-sm font-semibold uppercase">Create Smart Account</p>
            </Link>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="rounded-lg bg-kashmir-blue-200 p-4">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="h-16 w-16 text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-7 7.732V18h2v-2.268a2 2 0 1 0-2 0zM16 8V7a4 4 0 1 0-8 0v1h8z"></path>
                </g>
              </svg>
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

export default AccountList;
