import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  className?: string;
  selectedTab: string;
  options: { key: string; container: React.ReactElement }[];
  skeleton?: boolean;
}

const TabsContainer: React.FC<Props> = ({ selectedTab, options, className = "", skeleton }) => {
  const ContainerTab = options.map(({ key, container }) => {
    return <div key={key}>{selectedTab === key && container}</div>;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTab ? selectedTab : "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {ContainerTab}
      </motion.div>
    </AnimatePresence>
  );
};

export default TabsContainer;
