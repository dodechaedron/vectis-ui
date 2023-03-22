import React, { useEffect } from "react";
import { BsCheck, BsStack } from "react-icons/bs";
import SimpleButton from "./SimpleButton";
import { useCosmos } from "~/providers/CosmWasmProvider";
import { Claim } from "@vectis/types/Cw20Stake.types";

interface Props {
  tokenName: string;
}

const ClaimSection: React.FC<Props> = ({ tokenName }) => {
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const { address, daoQueryService } = useCosmos();

  useEffect(() => {
    if (!address) return;
    const getClaims = async () => {
      const claims = await daoQueryService.getUserClaims(address);
      setClaims(claims);
    };
    getClaims();
  }, [address]);

  if (!claims?.length) return null;

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div className="flex flex-row items-center gap-2 text-xl ">
          <BsStack className="h-4 w-4 text-white" />
          <p>Unstaking {tokenName} tokens</p>
        </div>
        <SimpleButton className="bg-zinc-800">Claim</SimpleButton>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-4">
        <div className="flex flex-row items-center justify-center gap-2">
          <img alt="logo" height="20" src="https://i.imgur.com/feotutm.png" width="20" />
          <p className="text-base"> {tokenName}</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <p>Available</p>
          <BsCheck className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ClaimSection;
