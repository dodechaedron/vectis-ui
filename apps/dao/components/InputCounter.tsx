import React, { ComponentPropsWithRef } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Input } from "@vectis/components";

interface InputCounter {
  label?: string;
  error?: string;
  changeAmount: (amount: number) => void;
}

const InputCounter: React.FC<ComponentPropsWithRef<"input"> & InputCounter> = React.forwardRef(
  ({ className, label, error, value = 0, changeAmount, max = 0, step, ...props }, ref) => {
    const handlerDown = () => {
      if (value === 0) return;
      changeAmount((value as number) - (step as number));
    };

    const handlerUp = () => {
      if (value === max) return;
      changeAmount((value as number) + (step as number));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value > max) return changeAmount(max as number);
      changeAmount(value);
    };

    return (
      <div className="relative mb-2 flex w-full flex-col ">
        {label && <label className={`mb-1 text-xs font-semibold text-zinc-300`}>{label}</label>}
        <div className="flex gap-2">
          <button onClick={handlerDown}>{<GoArrowLeft className="h-6 w-6 text-kashmir-blue-400 hover:text-kashmir-blue-500" />}</button>
          <Input
            ref={ref}
            className={`borderpy-2 rounded-md px-3 text-center text-sm outline-none transition duration-150 ease-in-out  ${
              className ? className : ""
            }`}
            type="number"
            value={value}
            onChange={onChange}
            {...props}
          />
          <button onClick={handlerUp}>{<GoArrowRight className="h-6 w-6 text-kashmir-blue-400 hover:text-kashmir-blue-500" />}</button>
        </div>
        <p className="absolute bottom-[-18px] w-full text-center text-xs text-pink-900 dark:text-pink-500">{error && error}</p>
      </div>
    );
  }
);

InputCounter.displayName = "InputCounter";
export default InputCounter;
