import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { IntlTimeAgo } from "~/services/browser";
import { useVectis } from "~/providers";
import { useToast } from "~/hooks";

import Address from "~/components/Address";
import { Button } from "~/components/Buttons";
import { Input } from "~/components/Inputs";
import NotFound from "~/components/NotFound";

import { ArrowDownTrayIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

import type { NextPage } from "next";
import { GuardianGroup } from "~/interfaces";

const GuaridanPage: NextPage = () => {
  const { queryClient, signingClient, userAddr } = useVectis();
  const { query, push: goToPage } = useRouter();
  const { toast, isLoading } = useToast();
  const [guardianInfo, setGuardianInfo] = useState<GuardianGroup | null>(null);
  const [controllerAddr, setControllerAddr] = useState<string>("");
  const [proposals, setProposals] = useState<any[]>([]);

  const multisig = useMemo(() => guardianInfo?.multisigCodeId, [guardianInfo]);

  const fetchGuardian = async () => {
    const guardians = await queryClient.getGuardianGroupByWalletAddr(query.address as string);
    if (!guardians.guardians.includes(userAddr)) {
      goToPage("/dashboard");
      return;
    }
    if (guardians.multisigAddress) {
      const proposals = await signingClient.getProposals(guardians?.multisigAddress as string);
      setProposals(proposals);
      await signingClient.getProposalVoteList(guardians.multisigAddress as string, proposals[0].id)
    }
    setControllerAddr(guardians?.wallet.controllerAddr);
    setGuardianInfo(guardians);
  };

  useEffect(() => {
    if (!query.address) return;
    fetchGuardian();
  }, [query, userAddr]);

  const rotate = async () => {
    if (multisig) {
      const promise = signingClient.proxyProposeRotateOperation(
        query.address as string,
        guardianInfo?.multisigAddress as string,
        controllerAddr
      );
      await toast.promise(promise, 3000);
      await fetchGuardian();
    } else {
      const promise = signingClient.updateControllerAddr(query.address as string, controllerAddr);
      await toast.promise(promise, 3000);
      await fetchGuardian();
    }
  };
  const freeze = async () => {
    if (multisig) {
      const promise = signingClient.proxyProposeFreezeOperation(
        query.address as string,
        guardianInfo?.multisigAddress as string,
        !guardianInfo?.wallet.frozen
      );
      await toast.promise(promise);
      await fetchGuardian();
    } else {
      const promise = signingClient.updateFreezeStatus(query.address as string);
      await toast.promise(promise);
      await fetchGuardian();
    }
  };

  return (
    <>
      <Head>
        <title>Vectis | Guardian</title>
      </Head>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))]">
        <div className="flex flex-col rounded-md bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Smart Account</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Useful information for guardianship</p>
          </div>
          <div className="divide-y divide-gray-200">
            <p className="py-4 px-6 text-sm font-medium text-gray-900">
              Account Name: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{guardianInfo?.wallet.label}</span>
            </p>
            <div className="py-4 px-6 text-sm font-medium text-gray-900">
              Account Address: <Address className="text-gray-500" address={query.address as string} />
            </div>
            <p className="py-4 px-6 text-sm font-medium text-gray-900">
              Status:{" "}
              <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{guardianInfo?.wallet.frozen ? "Frozen" : "Active"}</span>
            </p>
            <div className="grid grid-cols-3 gap-4 py-4 px-6">
              <p className="text-sm font-medium text-gray-900">
                Multisig: <span className="col-span-1 mt-0 text-sm text-gray-500">{guardianInfo?.multisigCodeId ? "Yes" : "No"}</span>
              </p>
              {guardianInfo?.multisigCodeId ? (
                <p className="text-sm font-medium text-gray-900">
                  Threshold: <span className="col-span-1 mt-0 text-sm text-gray-500">{ }</span>
                </p>
              ) : null}
              {guardianInfo?.multisigAddress ? (
                <p className="text-sm font-medium text-gray-900">
                  Multisig Address: <Address className="text-gray-500" address={guardianInfo?.multisigAddress} />
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Guardian Actions</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Execute guardianship actions over this account</p>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="flex flex-col gap-2 p-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold">
                Rotate Controller Address
                <span>
                  <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
                </span>
              </h4>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input container="flex-1 h-10" value={controllerAddr} onChange={(e) => setControllerAddr(e.target.value)} />
                <Button disabled={isLoading} className="flex-2 h-10 w-full py-1 sm:w-40" onClick={rotate}>
                  {multisig ? "Propose Rotation" : "Rotate"}
                </Button>
              </div>
            </div>
            <div className="flex justify-between gap-2 p-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold">
                {guardianInfo?.wallet.frozen ? "Unfreeze" : "Freeze"} Account
                <span>
                  <InformationCircleIcon className="h-5 w-5 cursor-pointer" />
                </span>
              </h4>
              <Button disabled={isLoading} className="h-10 w-40 py-2" onClick={freeze}>
                {multisig ? "Propose " : ""}
                {guardianInfo?.wallet.frozen ? "Unfreeze" : "Freeze"}
              </Button>
            </div>
          </div>
        </div>
        {guardianInfo?.multisigAddress ? (
          <div className="flex flex-col gap-4">
            {proposals.length ? (
              proposals.map((p) => {
                const threshold = p.threshold.absolute_count;
                return (
                  <div key={p.id} className="flex h-fit flex-col rounded-md bg-white shadow-sm">
                    <div className="border-b border-gray-200 bg-gray-50/30 px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 ">Active Proposals</h3>
                      <span className="mt-1 max-w-2xl text-sm text-gray-500">{p.title}</span>
                    </div>

                    <div className="divide-y divide-gray-200">
                      <p className="py-4 px-6 text-sm font-medium text-gray-900">
                        Proposal Id: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{p.id}</span>
                      </p>
                      <div className="py-4 px-6 text-sm font-medium text-gray-900">
                        Expires At: <span className="text-gray-500">{IntlTimeAgo(+new Date(p.expires.at_time / 1e6))}</span>
                      </div>
                      <p className="py-4 px-6 text-sm font-medium text-gray-900">
                        Status: <span className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">{p.status}</span>
                      </p>
                      <div className="grid grid-cols-3 gap-4 py-4 px-6">
                        <p className="text-sm font-medium text-gray-900">
                          Threshold:{" "}
                          <span className="col-span-1 mt-0 text-sm text-gray-500">{threshold.weight + " of " + threshold.total_weight}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <NotFound icon={ArrowDownTrayIcon} text="No Proposals" />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GuaridanPage;
