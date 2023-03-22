"use client";

import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const SimpleButton: React.FC<PropsWithChildren<ButtonAttributes>> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        className,
        `outline-none py-2 px-3 rounded-lg hover:filter hover:brightness-125 hover:cursor-pointer transition-all disabled:bg-zinc-400 disabled:hover:filter-none disabled:text-zinc-800`
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
