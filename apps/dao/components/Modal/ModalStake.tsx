import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "@vectis/components";
import ChooseTokenAmount from "../ChooseTokenAmount";
import { useDao } from "~/providers";

const ModalStake: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const { balance } = useDao();
  return (
    <Modal title="Stake amount">
      <div className="flex flex-col items-center justify-center gap-2">
        <ChooseTokenAmount maxAmount={Number(balance)} amount={amount} changeAmount={setAmount} step={1} />
        <Button disabled={balance === "0"}>Stake</Button>
      </div>
    </Modal>
  );
};

export default ModalStake;
