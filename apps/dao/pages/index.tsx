import React from "react";
import ClaimSection from "~/components/Claim";
import { useCosmos } from "~/providers/CosmWasmProvider";
import { useDao } from "~/providers/DaoProvider";
import { IntlAddress } from "~/utils/intl";
import { RiBankFill, RiGroupFill, RiLinkM, RiStackFill } from "react-icons/ri";
import { BiCoin } from "react-icons/bi";
import CardBalance from "~/components/CardBalance";
import CardStaked from "~/components/CardStaked";

export default function Home() {
  const { contractAddresses } = useCosmos();
  const { tokenInfo, totalStakedPercent } = useDao();

  return (
    <>
      <div className="absolute right-0 left-0 top-[-12rem] m-auto rounded-full md:h-[20rem] md:w-[30rem] md:bg-kashmir-blue-400 md:blur-[200px]" />
      <div className="space-y-8 md:space-y-12">
        <div className="shadow-xs relative mt-16 flex flex-col items-center rounded-lg bg-white md:mt-20">
          <div className="absolute -top-12 flex w-full items-center justify-center ">
            <div className="mb-8 h-24 w-24 overflow-hidden rounded-full">
              <img alt="logo" className="h-full w-full" src="https://pbs.twimg.com/profile_images/1635417886847008771/OshcLNw6_400x400.jpg" />
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 p-5 text-center md:grid-cols-4 md:justify-center md:gap-12">
            <div className="flex flex-col items-center gap-2 p-2">
              <RiLinkM className="h-6 w-6 text-zinc-400" />
              <p className="text-sm text-zinc-400">DAO`s address</p>
              <p className="text-md">{IntlAddress(contractAddresses.daoAddr)}</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-2">
              <RiBankFill className="h-6 w-6 text-zinc-400" />
              <p className="text-sm text-zinc-400">DAO Treasury</p>
              <p className="text-md">0 $USDC</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-2">
              <RiGroupFill className="h-6 w-6 text-zinc-400" />
              <p className="text-sm text-zinc-400">Total supply</p>
              <p className="text-md">
                {tokenInfo?.total_supply} ${tokenInfo?.symbol}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 p-2">
              <RiStackFill className="h-6 w-6 text-zinc-400" />
              <p className="text-sm text-zinc-400">Total staked</p>
              <p className="text-md">{totalStakedPercent}%</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2 text-xl">
            <BiCoin className="h-6 w-6" />
            <p>Your Tokens</p>
          </div>
          <div className="mt-4 flex flex-col items-stretch justify-start gap-4 md:flex-row">
            <CardBalance />
            <CardStaked />
            {
              // secitons
            }
          </div>
        </div>
      </div>
    </>
  );
}
