import React, { useState } from "react";

import { useVectis } from "~/providers";

import Spinner from "~/components/Spinner";

import Image from "next/image";

const ConnectWallet: React.FC = () => {
  const { connectWallet } = useVectis();
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    await connectWallet();
    setIsConnecting(false);
  };
  return (
    <div className="h-full flex items-center justify-center">
      <div className="mx-auto max-w-7xl lg:bg-transparent lg:px-8 mt-[8rem] lg:mt-0">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
            <div className="inset-x-0 h-1/2 bg-gray-50 lg:hidden" aria-hidden="true" />
            <div className="mx-auto px-6 sm:max-w-3xl lg:max-w-none lg:p-0 absolute lg:relative top-[-7.5rem] md:top-[-15rem] w-full lg:top-auto lg:w-auto">
              <Image
                width={900}
                height={1600}
                className="rounded-3xl object-cover object-center shadow-2xl h-[12rem] md:h-[20rem] w-full lg:h-full lg:max-h-[40rem]"
                alt="Wallet Purple"
                src="/wallet-purple.png"
              />
            </div>
          </div>

          <div className="relative bg-kashmir-blue-500 pt-[3rem] lg:pt-0 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center rounded-xl">
            <div className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block" aria-hidden="true">
              <svg
                className="absolute bottom-full left-full translate-y-1/3 -translate-x-2/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                    <rect x={0} y={0} width={4} height={4} className="text-white" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
              <svg
                className="absolute top-full -translate-y-1/3 -translate-x-1/3 transform xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                    <rect x={0} y={0} width={4} height={4} className="text-white" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md space-y-6 py-12 px-6 sm:max-w-3xl sm:py-16 lg:col-span-4 lg:col-start-4 lg:max-w-none lg:p-0">
              <h2 className="text-3xl font-bold tracking-tight text-white" id="join-heading">
                Please connect your wallet
              </h2>
              <p className="text-lg text-gray-200">
                By Connecting your wallet, you will be able to view your account details and perform transactions. <br /> Thank you for your
                understanding.
              </p>
              <button
                className="flex justify-center items-center w-full max-h-12 rounded-md border border-transparent bg-gray-50 py-3 px-5 text-center text-base font-medium text-kashmir-blue-500 shadow-md hover:bg-gray-200 md:w-[10rem]"
                onClick={connect}
              >
                {isConnecting ? <Spinner /> : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
