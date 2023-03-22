import React from "react";
import { Input, InputArea } from "@vectis/components";
import { BsFillShareFill } from "react-icons/bs";
import { Button } from "@vectis/components";
import { useDao } from "~/providers";
import { IntlAddress } from "~/utils/intl";
import { formatDuration, formatThreshold } from "~/utils/format";

export default function NewProposalPage() {
  const { config, preProposalConfig, tokenInfo, cw20StakedConfig } = useDao();

  if (!config) return null;

  const { quorum, threshold } = formatThreshold(config.threshold);

  return (
    <div className="my-4 space-y-4 md:space-y-12">
      <h1 className="text-xl">Create Proposal</h1>
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        <div className="rounded-md bg-white p-4">
          <h2 className="text-md mb-4 font-medium text-kashmir-blue-600">Addresses</h2>
          <div className="mb-4 flex items-center gap-2 md:mb-8">
            <p className="text-sm">DAO Treasury</p>
            <span className="text-xs">{IntlAddress(config.dao)}</span>
          </div>
          <h2 className="text-md mb-4 font-medium text-kashmir-blue-600">Proposal Info</h2>
          <div className="flex flex-wrap items-center justify-around gap-x-8 gap-y-4 rounded border border-zinc-600 p-5 md:flex-col md:items-stretch md:border-0 md:p-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs ">Proposal deposit:</span>
                <span className="text-sm">{`${preProposalConfig.deposit_info?.amount} $${tokenInfo.symbol}`}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs ">Deposit refund:</span>
                <span className="text-sm capitalize">{preProposalConfig.deposit_info?.refund_policy}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs ">Passing threshold:</span>
                <span className="text-sm">{threshold}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs ">Quorum:</span>
                <span className="text-sm">{quorum}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs ">Unstaking period:</span>
                <a>{formatDuration(cw20StakedConfig.unstaking_duration)}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <Input placeholder="Proposal Title" className="w-full" />
          <InputArea className="min-h-[10rem] w-full" placeholder="Proposal Description" />
          <Button disabled>
            Publish
            <BsFillShareFill className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
