"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  name: string;
  link: string;
  Icon?: IconType;
  toggle: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, link, Icon, toggle }) => {
  const active = usePathname() === link;
  return (
    <Link key={name} href={link}>
      <motion.li
        whileTap={{ scale: 0.95 }}
        className={clsx(
          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900",
          active ? "border-kashmir-blue-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        )}
      >
        {name}
      </motion.li>
    </Link>
  );
};

export default MenuItem;
