import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { IntlTimeAgo } from "~/services/browser";
import { useVectis } from "~/providers";
import { useToast } from "~/hooks";
import { fromNanoSecondsToSeconds } from "~/utils/conversion";

import { Button } from "./Buttons";
import NotFound from "./NotFound";
import ShowGuardian from "./ShowGuardian";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { GuardiansUpdateRequest } from "@vectis/types/Proxy.types";

const GuardianRequestCard: React.FC = () => {
  const { query } = useRouter();
  const { signingClient } = useVectis();
  const { toast } = useToast();
  const [activeProposal, setActiveProposal] = useState<GuardiansUpdateRequest | null>(null);

  useEffect(() => {
    const fetchActiveRequest = async () => {
      const activeRequest = await signingClient.getActiveGuardianRequests(query.address as string);
      setActiveProposal(activeRequest);
    };
    fetchActiveRequest();
  }, []);

  const acceptRequest = useCallback(async () => {
    try {
      const promise = signingClient.proxyAcceptGuardianRequest(query.address as string);
      await toast.promise(promise);
      setActiveProposal(null);
    } catch (e) { }
  }, [query]);

  const rejectRequest = useCallback(async () => {
    try {
      const promise = signingClient.proxyRejectGuardianRequest(query.address as string);
      await toast.promise(promise);
      setActiveProposal(null);
    } catch (e) { }
  }, [query]);

  const multisig = useMemo(() => activeProposal?.guardians?.guardians_multisig?.threshold_absolute_count, [activeProposal]);
  const activateAt = useMemo(() => +new Date(fromNanoSecondsToSeconds((activeProposal?.activate_at as { at_time: string })?.at_time)), [activeProposal])

  if (!activeProposal) {
    return (
      <div className="flex min-h-[28rem] flex-col rounded-md bg-white shadow-sm">
        <div className="border-b border-gray-200 py-5 px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Active Request</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Preview of your next guardians</p>
        </div>
        <NotFound icon={ArrowDownTrayIcon} text="No Request Found" />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="min-h-[28rem] rounded-md bg-white shadow-sm">
        <div className="py-5 px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Active Request</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Preview of your next guardians</p>
        </div>
        <div className="border-t border-gray-200 p-0">
          <dl className="divide-y divide-gray-200">
            <div className="grid grid-cols-2 gap-4 py-4 px-6">
              <p className="text-sm font-medium text-gray-900">
                Activate At:{" "}
                <span className="col-span-1 mt-0 text-sm text-gray-500">
                  {IntlTimeAgo(activateAt)}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 px-6">
              <p className="text-sm font-medium text-gray-900">
                Multisig: <span className="col-span-1 mt-0 text-sm text-gray-500">{multisig ? "Yes" : "No"}</span>
              </p>
              {multisig && (
                <p className="text-sm font-medium text-gray-900">
                  Threshold:{" "}
                  <span className="col-span-1 mt-0 text-sm text-gray-500">
                    {activeProposal.guardians.guardians_multisig?.threshold_absolute_count}
                  </span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 py-4 px-6">
              <h3 className="text-sm font-medium text-gray-900">Guardians</h3>
              <div className="col-span-3 mt-0 text-sm text-gray-900">
                <ShowGuardian guardians={activeProposal.guardians.addresses} />
              </div>
            </div>
          </dl>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="white" className="px-8" onClick={rejectRequest}>
          Reject
        </Button>
        {activateAt < Date.now() ? (<Button className="px-6" onClick={acceptRequest}>
          Confirm
        </Button>) : null}
      </div>
    </div >
  );
};

export default GuardianRequestCard;
