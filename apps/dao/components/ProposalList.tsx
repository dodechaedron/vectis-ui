import React, { useEffect } from "react";
import clsx from "clsx";

import { NotFound } from "@vectis/components";

import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { useCosmos, useDao } from "~/providers";
import Link from "next/link";

interface Props {
  filter?: boolean;
  pagination?: boolean;
  defaultLimit?: number;
}

const ProposalList: React.FC<Props> = ({ pagination }) => {
  const { proposals } = useDao();

  return (
    <div className={clsx("h-full flex-1 divide-y divide-gray-200 rounded-md bg-white", { "rounded-b-md": !pagination })}>
      {proposals.length ? (
        proposals.map(({ id, proposal }) => {
          const { title, status } = proposal;
          return (
            <Link
              href={`/proposals/${id}`}
              key={`proposal-${id}`}
              className="grid grid-cols-2 grid-rows-2 items-center gap-2 rounded-lg bg-white p-4 text-sm hover:bg-kashmir-blue-200 sm:grid-rows-1 sm:justify-start md:grid-cols-[8ch_1fr_9ch]"
            >
              <p className="text-kashmir-blue-500">#{id}</p>
              <p className="">{title}</p>
              <p className="text-right">{status}</p>
            </Link>
          );
        })
      ) : (
        <NotFound icon={MinusCircleIcon} text="No Proposals" />
      )}
    </div>
  );
};

export default ProposalList;
