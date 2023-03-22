import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "@vectis/components";
import ChooseTokenAmount from "../ChooseTokenAmount";
import { useDao } from "~/providers";

const ModalUnstake: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const { stakedBalance } = useDao();
  return (
    <Modal title="Unstake amount">
      <div className="flex flex-col items-center justify-center gap-2">
        <ChooseTokenAmount maxAmount={Number(stakedBalance)} amount={amount} changeAmount={setAmount} step={1} />
        <Button disabled={stakedBalance === "0"}>Unstake</Button>
      </div>
    </Modal>
  );
};

export default ModalUnstake;
