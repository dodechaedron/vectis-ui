import clsx from "clsx";
import React from "react";
import InputCounter from "./InputCounter";
import InputRange from "./InputRange";

interface Props {
  maxAmount: number;
  amount: number;
  step: number;
  changeAmount: (amount: number) => void;
}

const ChooseTokenAmount: React.FC<Props> = ({ maxAmount, amount, changeAmount, step }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* <h2 className="text-center text-sm">Choose your token amount</h2> */}
      <InputCounter max={maxAmount} min="0" value={amount} changeAmount={changeAmount} step={step} />
      <p className="text-xs dark:text-zinc-400">Max available: {maxAmount}</p>
    </div>
  );
};

export default ChooseTokenAmount;
