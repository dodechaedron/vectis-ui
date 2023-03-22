import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { useDao } from "~/providers";
import ProposalList from "~/components/ProposalList";
import Link from "next/link";
import { formatDuration, formatThreshold } from "~/utils/format";

export default function Proposals() {
  const { config, cw20StakedConfig } = useDao();

  if (!config) return null;

  const { quorum, threshold } = formatThreshold(config.threshold);

  return (
    <div className="my-8 space-y-8 md:space-y-12">
      <div className="rounded-lg  bg-gradient-to-br from-kashmir-blue-400 to-kashmir-blue-600">
        <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 pb-28 md:px-8 md:pb-16">
          <div className="mb-8 h-24 w-24 overflow-hidden rounded-full">
            <img alt="logo" className="h-full w-full" src="https://pbs.twimg.com/profile_images/1635417886847008771/OshcLNw6_400x400.jpg" />
          </div>
          <h1 className="mb-1 h-9 text-4xl font-bold text-white">VECTIS DAO</h1>
          <p className="h-5 w-[70%] text-center text-white">
            The DAO is designed to encourage individuals and entities to collaborate and build a better experience for users to interact with
            blockchains.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-t-zinc-200 py-8 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs text-zinc-200">Max Voting Period:</span>
              <span className="text-white">{formatDuration(config.max_voting_period)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs text-zinc-200">Allow Revoting:</span>
              <span className="text-white">{config.allow_revoting ? "Yes" : "No"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs text-zinc-200">Passing threshold:</span>
              <span className="text-white">{threshold}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs text-zinc-200">Quorum:</span>
              <span className="text-white">{quorum}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs text-zinc-200">Unstaking period:</span>
              <span className="text-white">{formatDuration(cw20StakedConfig.unstaking_duration)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="title-text">Proposals</h3>
          <Link
            href="/propose"
            className="flex items-center justify-center gap-2 rounded-md border border-transparent bg-kashmir-blue-400 px-4 py-2 font-medium text-white transition-all duration-150 ease-in hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-25 "
          >
            New Proposal <BsPlusLg className="h-3 w-3" />
          </Link>
        </div>
        <ProposalList />
      </div>
    </div>
  );
}
