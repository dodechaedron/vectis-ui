import React from "react";
import { useRouter } from "next/router";
import { useVectis } from "providers";
import { headingLink } from "utils/links";

import { IntlAddress } from "~/services/browser";

import { AiOutlineLogout } from "react-icons/ai";

const Heading: React.FC = () => {
  const { pathname } = useRouter();
  const { userAddr, disconnect } = useVectis();
  const link = headingLink.find((link) => link.href === pathname);

  if (!userAddr) return null;

  if (pathname === "/404") return null;

  return (
    <div className="border-b border-gray-200 px-4 py-6 bg-white h-[4.5rem] flex justify-between items-center">
      <h2 className="text-2xl leading-6 text-gray-900 font-bold">{link?.text || ""}</h2>
      {userAddr ? (
        <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={disconnect}>
          <AiOutlineLogout className="h-6 w-6 text-kashmir-blue-500" />
          <div className="flex flex-col">
            <p className="text-[8px] text-gray-400 mb-[-4px]">connected</p>
            <p className="text-sm">{IntlAddress(userAddr, 8)}</p>
          </div>
        </div>
      ) : (
        <>
          {/* <button className="block w-full rounded-md border border-transparent bg-kashmir-blue-500 py-3 px-5 text-center text-base font-medium text-white shadow-md hover:bg-kashmir-blue-600  sm:inline-block sm:w-auto">
            Connect Wallet
          </button> */}
        </>
      )}
      {/* {description && <p className="mt-2 max-w-4xl text-xs text-gray-500">{description}</p>} */}
    </div>
  );
};

export default Heading;
