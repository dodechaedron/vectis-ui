import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Input } from "components/Inputs";
import InputPrice from "components/Inputs/InputPrice";
import { useVectis } from "providers";
import { useFormContext } from "react-hook-form";
import { convertDenomToMicroDenom, convertMicroDenomToDenom } from "utils/conversion";

import { Coin } from "@cosmjs/amino";

import { Button } from "../Buttons";

interface Props {
  goBack: () => void;
  goNext: () => void;
}

const StepAccountDetails: React.FC<Props> = ({ goBack, goNext }) => {
  const { queryClient, network, account } = useVectis();
  const [walletFee, setWalletFee] = useState<Coin>();
  const { register, watch, setValue } = useFormContext();
  const [balance, setBalance] = useState<Coin>({ amount: "0", denom: network.feeToken });

  const initialFunds = watch("initialFunds");

  const totalCost = useMemo(
    () => Math.ceil(Number(walletFee?.amount || 0) + Number(convertDenomToMicroDenom(initialFunds))),
    [walletFee, initialFunds]
  );

  useEffect(() => {
    queryClient.getFees().then(({ wallet_fee }) => setWalletFee(wallet_fee));
    queryClient.getBalance(account.address, network.feeToken).then((balance) => setBalance(balance));
  }, []);

  return (
    <div className="mt-5">
      <div className="flex min-h-[35rem] rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <div className="flex-1 xl:grid xl:grid-cols-3 xl:gap-4">
          <div className="flex flex-col justify-start gap-2 border-b border-gray-200 pb-4 xl:col-span-1 xl:border-b-0 xl:border-r">
            <section>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Why creation fee?</h3>
              <p className="mt-1 pr-6  text-justify text-sm leading-5 text-gray-500">
                This fee is held in the DAO treasury and managed by the DAO members via proposals voting.
                <br />
              </p>
            </section>
          </div>

          <div className="col-span-2 mt-3 xl:mt-0">
            <div className="col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Account Name</h3>
              <p className="mt-1 text-sm text-gray-500">This is the name given to the wallet to make easily to identify.</p>
              <Input className="my-4" placeholder="Account Name" {...register("label")} />
            </div>
            <p className="my-2 sm:border-t sm:border-gray-200" />

            <div className="grid grid-cols-2">
              <div className="col-span-2 gap-2 lg:col-span-1">
                <InputPrice
                  label="How much do you want to charge"
                  placeholder="0"
                  currency={network.feeToken}
                  value={initialFunds}
                  onChange={(e) => setValue("initialFunds", e.target.value)}
                />
                <div className="my-4">
                  <div className="flex justify-between rounded-t-md border border-gray-200 py-2 px-3">
                    <span>
                      {convertMicroDenomToDenom(walletFee?.amount)} {walletFee?.denom}
                    </span>
                    <span className="text-sm text-gray-500">Creation Fee</span>
                  </div>
                  <div className="flex justify-between rounded-b-md border border-t-0 border-gray-200 py-2 px-3">
                    <span>
                      {convertMicroDenomToDenom(balance.amount)} {balance.denom}
                    </span>
                    <span className="text-sm text-gray-500">Current Balance</span>
                  </div>
                </div>

                <InputPrice label="Total cost" value={convertMicroDenomToDenom(totalCost)} currency={network.feeToken} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button onClick={goBack} className="mt-5">
          Back
        </Button>
        <Button onClick={goNext} className="mt-5">
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepAccountDetails;
