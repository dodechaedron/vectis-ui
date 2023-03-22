import clsx from "clsx";
import React from "react";

type TextAreaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

interface TextArea {
  label?: string;
  error?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & TextArea>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full mb-8  relative ">
      <label className="text-zinc-300 font-semibold text-xs mb-1">{label && label}</label>
      <textarea
        ref={ref}
        className={clsx(
          `border text-sm border-zinc-700 bg-zinc-500/20 focus:bg-zinc-700 disabled:text-zinc-500 py-2 px-3 rounded-md outline-none transition duration-150 ease-in-out`,
          className ? className : ""
        )}
        {...props}
      />
      <p className="text-pink-900 dark:text-pink-300 text-xs absolute bottom-[-18px] w-full text-center">{error && error}</p>
    </div>
  );
});

TextArea.displayName = "TextArea";
export default TextArea;
