import React from "react";

import { Button } from "./Buttons";
import { Input } from "./Inputs";

import { IoMdSwap } from "react-icons/io";

const ConversionCard: React.FC = () => {
  return (
    <div className="scroll-bar-thin flex flex-col gap-1 rounded-md bg-white p-4">
      <h2 className="text-lg">Conversion</h2>
      <div className="flex items-end justify-center gap-1">
        <Input label="Amount" className="w-full !text-xs" />
        <Button className="rounded-full !px-2 !py-2 text-white">
          <IoMdSwap className="h-5 w-5" />
        </Button>
        <Input className="w-full !text-xs" />
      </div>
      <div className="mt-2 text-xs text-gray-500">Conversion Rate: </div>
    </div>
  );
};

export default ConversionCard;
