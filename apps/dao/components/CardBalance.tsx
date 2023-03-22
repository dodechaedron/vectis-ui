import React from "react";
import { Button } from "@vectis/components";
import { useDao } from "~/providers";
import { ModalTypes, useModal } from "~/providers/ModalProvider";

const CardBalance: React.FC = () => {
  const { tokenInfo, balance } = useDao();
  const { showModal } = useModal();

  if (!tokenInfo) return null;

  return (
    <div className="shadow-xs flex-1 rounded-lg border bg-white p-6">
      <p className="mb-2 text-sm text-zinc-400">
        <span>Your balance</span>
      </p>
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img alt="logo" height="20" src="https://pbs.twimg.com/profile_images/1635417886847008771/OshcLNw6_400x400.jpg" width="20" />
          <p className="text-base">
            {balance} ${tokenInfo.symbol}
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between">
        <Button variant="primary" onClick={() => showModal(ModalTypes.Stake)}>
          Stake
        </Button>
      </div>
    </div>
  );
};

export default CardBalance;
