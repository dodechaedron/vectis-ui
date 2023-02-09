import React from "react";

import { UserIcon } from "@heroicons/react/24/solid";

interface Props {
  guardians: string[];
}

const ShowGuardian: React.FC<Props> = ({ guardians }) => {
  return (
    <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200 mb-4">
      {guardians.map((g) => {
        return (
          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm" key={g}>
            <div className="flex overflow-auto flex-1 items-center">
              <UserIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <span className="ml-2 flex-1 overflow-auto scrollbar-none">{g}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ShowGuardian;
