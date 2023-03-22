import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  handlerTab: (key: string) => void;
  selectedTab: string;
  tabs: {
    content: React.ReactElement | string;
    key: string;
  }[];
}

const GroupButtons: React.FC<Props> = ({ tabs, selectedTab, handlerTab }) => {
  const Tabs = tabs.map(({ content, key }) => {
    return (
      <motion.button
        key={key}
        className={clsx(
          "flex-1 py-1 px-2 flex justify-center items-center w-full relative transition duration-150 ease-in-out hover:bg-zinc-500/50 rounded",
          key === selectedTab ? `text-emerald-500` : "bg-transparent border-transparent"
        )}
        onClick={() => handlerTab(key)}
      >
        {content}
        {key === selectedTab ? (
          <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-emerald-500" layoutId="underline" />
        ) : null}
      </motion.button>
    );
  });
  return (
    <div className="inline-flex bg-cw-grey-800" role="group">
      {Tabs}
    </div>
  );
};

export default GroupButtons;
