import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

const InputArea: React.FC<ComponentPropsWithoutRef<"textarea">> = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx(
        "rounded-md p-2 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6",
        className
      )}
      {...props}
    />
  );
};

export default InputArea;
