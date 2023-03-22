import React, { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";

interface Props {
  text: string;
  icon: ElementType;
}

export const NotFound: React.FC<Props & ComponentPropsWithoutRef<"div">> = ({ text, icon: Icon, className, ...props }) => {
  return (
    <div className={clsx("flex h-full flex-1 flex-col items-center justify-center p-6", className)} {...props}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-kashmir-blue-100/20">
        <Icon className="h-8 w-8 text-kashmir-blue-500" />
      </div>
      <p className="mt-2 text-sm font-medium text-gray-900">{text}</p>
    </div>
  );
};
