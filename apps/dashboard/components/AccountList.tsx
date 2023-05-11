import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Link from 'next/link';

import { useApp, useTranslations } from '~/providers';

import SmartAccountCard from '~/components/SmartAccountCard';
import Spinner from '~/components/Spinner';

import { IoAddCircleOutline } from 'react-icons/io5';

interface Props {
  showCreateAccount?: boolean;
}

const AccountList: React.FC<Props> = ({ showCreateAccount }) => {
  const { t } = useTranslations();
  const queryClient = useQueryClient();

  const { vectis, userAccounts } = useApp();
  const { data: accounts, isLoading } = useQuery(['vectis_accounts', ...userAccounts], () => vectis.getAccounts(userAccounts), {
    enabled: Boolean(userAccounts.length) && Boolean(vectis),
    onSuccess: (accounts) => accounts.forEach((account) => queryClient.setQueryData(['vectis_account', account.address], account))
  });

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row">
      {isLoading ? <Spinner className="mx-auto" /> : null}
      {accounts?.map((smartAccount, i) => (
        <SmartAccountCard key={`card-${smartAccount.address}`} smartAccount={smartAccount} />
      ))}
      {showCreateAccount && !isLoading ? (
        <Link
          href="/accounts/create"
          passHref={true}
          className="hover:bg-mirage-100/30 border-black-300 mx-auto flex h-[12rem] w-full max-w-[24rem] flex-col items-center justify-center rounded-md border-2 border-dashed py-2 px-3 text-gray-400 transition-all hover:text-gray-700"
          data-testid="create-wallet"
        >
          <IoAddCircleOutline className="text-4xl" />
          <p className="text-sm font-semibold uppercase">Create Smart Account</p>
        </Link>
      ) : null}
    </div>
  );
};

export default AccountList;
