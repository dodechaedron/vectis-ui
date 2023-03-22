import React from "react";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface InputRange {
  changeAmount: (amount: number) => void;
}

const InputRange = React.forwardRef<HTMLInputElement, InputProps & InputRange>(({ className, changeAmount, max = 0, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full ">
      <input
        ref={ref}
        className={`input-range text-sm rounded-md focus:outline-none transition duration-150 ease-in-out ${className ? className : ""}`}
        type="range"
        onChange={(e) => changeAmount(Number(e.target.value))}
        {...props}
        max={max}
      />
    </div>
  );
});

InputRange.displayName = "InputRange";
export default InputRange;
