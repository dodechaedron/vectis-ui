import React, { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface Props {
  size?: "sm" | "md" | "lg";
}

const styles = { sm: "w-7 h-7 border-[3px]", md: "h-12 w-12 border-4" };

const Spinner: React.FC<ComponentPropsWithoutRef<"div"> & Props> = ({ className, size = "sm" }) => {
  return (
    <div className={clsx(styles[size], className, "rounded-full animate-spin border-solid border-kashmir-blue-500 border-t-transparent")} />
  );
};

export default Spinner;
