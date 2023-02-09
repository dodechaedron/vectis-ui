import React from "react";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const Hamburguer: React.FC<Props> = ({ isOpen, toggle }) => {
  return (
    <div
      className="flex flex-col h-[24px] w-[24px] justify-center items-center gap-[0.4rem] hover:cursor-pointer transition-all md:hidden"
      onClick={toggle}
    >
      <span className={clsx("w-[24px] h-[2px] bg-gray-900 transition-all", isOpen ? "rotate-[45deg] translate-y-[10px]" : "")} />
      <span className={clsx("w-[24px] h-[2px] bg-gray-900 transition-all", isOpen ? "opacity-0" : "opacity-100")} />
      <span className={clsx("w-[24px] h-[2px] bg-gray-900 transition-all", isOpen ? "rotate-[-45deg] translate-y-[-5px]" : "")} />
    </div>
  );
};

export default Hamburguer;
