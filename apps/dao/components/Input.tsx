import React from "react";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Input {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & Input>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full mb-8 relative ">
      <label className={`font-semibold text-xs mb-1 text-zinc-300`}>{label && label}</label>
      <input
        ref={ref}
        className={`border text-sm border-zinc-700 bg-zinc-500/20 focus:bg-zinc-700 py-2 px-3 rounded-md outline-none transition duration-150 ease-in-out ${
          className ? className : ""
        }`}
        {...props}
      />
      <p className="text-pink-900 dark:text-pink-300 text-xs absolute bottom-[-18px] w-full text-center">{error && error}</p>
    </div>
  );
});

Input.displayName = "Input";
export default Input;
