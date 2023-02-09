import React, { useState } from "react";
import clsx from "clsx";
import SmartAccountMiniCard from "components/SmartAccountMiniCard";
import { socialsLinks } from "utils/links";
import Link from "next/link";

import VectisLogo from "../Icons/VectisLogo";

import Hamburguer from "./Hamburguer";
import MenuLinks from "./MenuLinks";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <div className="relative flex w-full flex-col bg-white md:sticky md:top-0 md:h-screen md:w-[15rem] md:min-w-[15rem] md:p-0">
      <div className="flex items-center justify-between border-b px-5 py-6 md:h-[4.5rem]">
        <Link href="/dashboard">
          <VectisLogo className="h-[24px] w-[100px] fill-kashmir-blue-500" />
        </Link>
        <Hamburguer isOpen={isOpen} toggle={toggleOpen} />
      </div>
      <div
        className={clsx(
          "absolute top-[64px] z-50 h-[calc(100vh-64px)] w-full bg-white p-4 backdrop-blur transition-all md:relative md:top-0 md:h-fit md:flex-1 md:p-0",
          "flex flex-col items-start justify-between",
          isOpen ? "left-0" : "left-[-100vw] md:left-0"
        )}
      >
        <MenuLinks closeMenu={() => setIsOpen(false)} />
        <div className="flex w-full flex-col items-center justify-between gap-4 p-4">
          <SmartAccountMiniCard />
          <ul className="flex w-full items-center justify-center gap-4">
            {socialsLinks.map(({ Icon, href, text }) => (
              <Link key={href} target="_blank" className="text-gray-600 hover:text-kashmir-blue-700" href={href}>
                <Icon aria-label={text} size={20} />
              </Link>
            ))}
          </ul>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
