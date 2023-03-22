import React, { useEffect, useState } from "react";
import { useCosmos } from "~/providers/CosmWasmProvider";
import { VoteInfo } from "@vectis/types/DaoProposalSingle.types";

interface Props {
  proposalId: string;
}

const VoteInfo: React.FC<Props> = ({ proposalId }) => {
  const { address, daoQueryService } = useCosmos();
  const [vote, setVote] = useState<VoteInfo | null>(null);

  useEffect(() => {
    if (!address) return;
    daoQueryService.getUserVote(address, proposalId).then(setVote);
  }, [address]);

  return (
    <div>
      <h2 className="mb-2 text-lg font-medium">Your voting info</h2>
      <div className="flex items-center justify-between rounded-lg bg-zinc-700/30 p-4">
        <div className="flex flex-col items-start justify-center">
          <p className="text-md">Your voting</p>
          <p className="text-xs text-zinc-300">(GOVEC)</p>
        </div>
        <p className="text-md">{vote ? vote.vote : "?"}</p>
      </div>
    </div>
  );
};

export default VoteInfo;
