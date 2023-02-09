import { useEffect, useState } from "react";
import Head from "next/head";

import { useVectis } from "~/providers";

import GuardianWalletList from "~/components/GuardianWalletList";
import NotFound from "~/components/NotFound";

import { UserGroupIcon } from "@heroicons/react/24/solid";

import type { NextPage } from "next";
import { GuardianGroup } from "~/interfaces";

const Guardian: NextPage = () => {
  const { queryClient, userAddr } = useVectis();
  const [guardianGroups, setGuardianGroups] = useState<GuardianGroup[]>([]);

  useEffect(() => {
    const fetchGuardianGroups = async () => {
      try {
        const guardianGroups = await queryClient.getWalletGuardians(userAddr);
        setGuardianGroups(guardianGroups);
      } catch (e) {
        console.log(e);
      }
    };
    fetchGuardianGroups();
  }, [userAddr]);

  return (
    <>
      <Head>
        <title>Vectis | Guardian</title>
      </Head>
      {guardianGroups.length ? (
        <div className="h-full rounded-md bg-white shadow-sm">
          <GuardianWalletList guardianGroups={guardianGroups} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex h-full items-center justify-center rounded-md bg-white shadow xl:px-8 xl:py-14 ">
            <NotFound icon={UserGroupIcon} text="You don't guardian other smart accounts" />
          </div>
        </div>
      )}
    </>
  );
};

export default Guardian;
