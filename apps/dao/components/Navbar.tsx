"use client";

import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import HamburguerToggle from "./HamburguerToggle";
import MenuItem from "./MenuItem";
import clsx from "clsx";
import { BsFillBarChartFill, BsFillGridFill } from "react-icons/bs";
import Link from "next/link";
import { IoLogInOutline, IoWalletOutline } from "react-icons/io5";
import { useCosmos } from "~/providers/CosmWasmProvider";
import { AiOutlineLogout } from "react-icons/ai";
import { VectisLogo } from "@vectis/components";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuLinks = [
  { name: "Overview", link: "/", icon: BsFillBarChartFill },
  { name: "Proposals", link: "/proposals", icon: BsFillGridFill },
];

const Navbar: React.FC = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { connect, disconnect, username } = useCosmos();
  const containerRef = useRef(null);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className={clsx(
        "sticky top-0 z-50 flex h-[2.9rem] items-center justify-between border-b border-gray-200 bg-white px-4 py-4 transition-all duration-150 ease-in md:h-fit md:flex-row",
        { "fixed !h-screen flex-col !justify-center gap-8": isOpen }
      )}
    >
      <Link
        className={clsx(
          "text-xl font-semibold",
          isOpen ? "absolute top-2 left-4" : ""
        )}
        href="/"
      >
        <VectisLogo className="h-[24px] w-[100px] fill-kashmir-blue-500" />
      </Link>
      <motion.ul
        variants={variants}
        className={clsx("flex gap-4", isOpen ? "flex-col" : "hidden md:flex")}
      >
        {menuLinks.map(({ name, link, icon }, i) => (
          <MenuItem
            key={i}
            name={name}
            link={link}
            Icon={icon}
            toggle={() => toggleOpen()}
          />
        ))}
      </motion.ul>
      <HamburguerToggle toggle={() => toggleOpen()} isOpen={isOpen} />
      <div className="hidden min-w-[10rem] items-center justify-end md:flex">
        <button
          className={clsx(
            "relative items-center justify-center rounded-lg bg-gradient-to-r px-4 py-2 text-white transition-all duration-150 ease-in hover:brightness-125 md:flex",
            isOpen ? "!flex" : "",
            username ? "bg-kashmir-blue-500" : "bg-kashmir-blue-400"
          )}
          onClick={() => (username ? disconnect : connect)()}
        >
          <IoLogInOutline
            className={clsx(
              "h-4 w-4 transition-all",
              username ? "!w-0" : "mr-2"
            )}
          />
          {username ? (
            <p className="text-sm">{username}</p>
          ) : (
            <p className="text-sm">Connect Wallet</p>
          )}
          <IoWalletOutline
            className={clsx(
              "h-4 w-4 transition-all",
              username ? "ml-2" : "!w-0"
            )}
          />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
