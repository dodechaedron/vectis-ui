import { useEffect, useState } from "react";
import SmartAccountCard from "components/SmartAccountCard";
import SmartAccountStatictis from "components/SmartAccountStatictis";
import { useTranslations, useVectis } from "providers";
import Head from "next/head";
import Link from "next/link";

import { Coin } from "@cosmjs/amino";

import { IoAddCircleOutline } from "react-icons/io5";

import type { NextPage } from "next";
import { WalletInfo } from "@vectis/types/Proxy.types";

const ListWallets: NextPage = () => {
  const { t } = useTranslations();
  const { signingClient, userAddr, network } = useVectis();
  const [smartAccounts, setSmartAccounts] = useState<(WalletInfo & { balance: Coin; address: string; createdAt: string })[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        const wallets = await signingClient.getUserWallets(userAddr);
        const walletInfo = await Promise.all(
          wallets.map(async ({ id, createdAt }) => {
            const walletInfo = await signingClient.getWalletInfo(id);
            const balance = await signingClient.getBalance(id, network.feeToken);
            return Object.assign(walletInfo, { balance, address: id, createdAt });
          })
        );
        const totalBalance = walletInfo.reduce((acc, { balance }) => acc + Number(balance.amount), 0);
        setTotalBalance(totalBalance);
        setSmartAccounts(walletInfo);
      } catch (er) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, [userAddr]);

  return (
    <>
      <Head>
        <title>Vectis | Wallets</title>
      </Head>

      <div className="flex h-full flex-col">
        <div className="grid h-full w-full grid-cols-1 gap-4 rounded-md bg-white p-4 shadow sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:px-8 xl:py-14">
          <Link
            href="/accounts/create"
            passHref={true}
            className="hover:bg-mirage-100/30 mx-auto flex h-[12rem] w-full max-w-[24rem] flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 py-2 px-3 text-gray-400 transition-all hover:text-gray-700"
            data-testid="create-wallet"
          >
            <IoAddCircleOutline className="text-4xl" />
            <p className="text-sm font-semibold uppercase">Create Smart Account</p>
          </Link>
          {smartAccounts.map((smartAccount, i) => (
            <SmartAccountCard key={`card-${smartAccount.address}`} smartAccount={smartAccount} />
          ))}
        </div>
        <SmartAccountStatictis numberOfAccounts={smartAccounts.length} totalBalance={totalBalance} />
      </div>
    </>
  );
};

export default ListWallets;
