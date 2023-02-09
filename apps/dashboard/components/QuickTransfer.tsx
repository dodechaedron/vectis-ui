import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { Input } from "./Inputs";

import { FaUserAlt } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

const mockContacts = [
  { account: "23", name: "Elena" },
  { account: "22", name: "Gian Luca" },
  { account: "45", name: "Belsy" },
  { account: "3", name: "Alberto" },
  { account: "42", name: "Egidio" },
  { account: "1", name: "Javier" },
];

const gradients = ["grass", "ocean", "cake", "orquid"];

const QuickTransfer: React.FC = () => {
  const [selected, seetselected] = useState<string>("");

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 text-left mb-2">Quick Contacts</label>
      <div className="flex relative gap-4 px-1 justify-start items-center">
        <Link href="/agenda" className="group flex flex-col text-gray-600 text-xs items-center justify-center min-w-fit cursor-pointer">
          <div className="border border-spacing-1 border-dashed border-gray-600 group-hover:bg-gray-200/20  flex items-center justify-center h-10 w-10 rounded-full">
            <HiPlus className="h-4 w-4" />
          </div>
          <p>Add new</p>
        </Link>
        {mockContacts.slice(0, 5).map(({ account, name }, i) => {
          const random = gradients[i % gradients.length];
          return (
            <div
              key={`contact-${i}`}
              className="flex flex-col text-xs items-center justify-center text-gray-600 cursor-pointer"
              onClick={() => seetselected(account)}
            >
              <div
                className={clsx(
                  ` flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-bl from-gradient-${random}-from to-gradient-${random}-to transition-all`,
                  selected === account && " border-2 border-kashmir-blue-500"
                )}
              >
                <FaUserAlt className="h-3 w-3 text-white" />
              </div>
              <p className="">{name}</p>
            </div>
          );
        })}
      </div>
      <Input className="w-full mt-2" />
    </div>
  );
};

export default QuickTransfer;
