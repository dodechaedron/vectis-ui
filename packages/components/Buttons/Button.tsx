import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { Spinner } from "../Spinner";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props {
  variant?: "primary" | "secondary" | "white";
  isLoading?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonAttributes & Props>> = ({ children, className, isLoading, variant = "primary", ...props }) => {
  return (
    <button
      className={clsx(
        `flex items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 font-medium transition-all duration-150 ease-in disabled:cursor-not-allowed disabled:opacity-25`,
        className,
        {
          "bg-kashmir-blue-500 text-white hover:brightness-110 ": variant?.includes("primary"),
          "bg-kashmir-blue-100 text-kashmir-blue-700 hover:bg-kashmir-blue-200": variant?.includes("secondary"),
          "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50":
            variant?.includes("white"),
        }
      )}
      {...props}
    >
      {isLoading ? <Spinner className={variant.includes("primary") ? "border-white" : "border-kashmir-blue-500"} /> : children}
    </button>
  );
};

export default Button;
