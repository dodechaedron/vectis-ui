import React, { ComponentPropsWithoutRef,useState } from "react";

interface Props extends Omit<ComponentPropsWithoutRef<"input">, "onChange" | "value"> {
  label?: string;
  onChange?: (n: number) => void;
  value?: number;
}

const InputRange: React.FC<Props> = ({ className, value, onChange, ...props }) => {
  const [state, setState] = useState<number>(Number(value || 0));
  const _onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);
    onChange?.(value);
    setState(value);
  };

  return (
    <div className="flex flex-col w-full">
      <input
        className={`range h-3 rounded-md focus:outline-none transition duration-150 ease-in-out ${className ? className : ""}`}
        type="range"
        value={state}
        onChange={_onChange}
        {...props}
      />
    </div>
  );
};

export default InputRange;
