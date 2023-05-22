import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Button } from '../Buttons';
import SmartAccountCard from '../SmartAccountCard';

import { ImCheckboxChecked } from 'react-icons/im';

import { VectisAccount } from '~/interfaces';

interface Props {
  smartAccount?: VectisAccount;
}

const StepSuccess: React.FC<Props> = ({ smartAccount }) => {
  const { push: goToPage } = useRouter();
  return (
    <>
      <div className="sm: my-5 flex min-h-[35rem] flex-col justify-between overflow-hidden rounded-lg bg-white shadow">
        <div className="relative flex w-full flex-col justify-around p-4 pt-10 lg:flex-row lg:py-10">
          <div className="max-w-[24rem]">
            {smartAccount ? (
              <SmartAccountCard
                className="shine w-fit"
                onClick={() => goToPage(`/dashboard?vectis=${smartAccount.address}`)}
                smartAccount={smartAccount}
              />
            ) : null}
          </div>
          <div className="flex w-full max-w-[24rem] flex-col items-start justify-start gap-2">
            <div className="mb-10 flex h-fit items-center gap-4">
              <ImCheckboxChecked className="h-8 w-8 text-kashmir-blue-200" />
              <h3 className="text-lg font-medium leading-6 text-kashmir-blue-600">Account created successfully!</h3>
            </div>
            <Button as={Link} href="/">
              Account Explorer
            </Button>
          </div>
        </div>
        <div
          className="group flex h-[14rem] w-full cursor-pointer items-center justify-center gap-14 rounded-b-lg bg-gradient-to-l from-kashmir-blue-200 to-kashmir-blue-50 p-4 pt-12 transition-all hover:from-kashmir-blue-300 hover:to-kashmir-blue-100"
          onClick={() => window.open('https://chrome.google.com/webstore/detail/vectis-wallet/cgkaddoglojnmfiblgmlinfaijcdpfjm')}
        >
          <div className=" relative mt-4">
            <img className="relative z-10 h-32 w-32" src="https://cdn.icon-icons.com/icons2/1381/PNG/512/chromestore_94201.png" />
            <img
              className="absolute inset-0 m-auto h-14 w-14 rotate-90 transition-all group-hover:translate-y-[-5.5rem] group-hover:rotate-[360deg]"
              src="https://images-ext-1.discordapp.net/external/q-Y-svsOjxChc5wzAnSQt7MG3bg5Nt2-GMeNbTJf3z4/https/cloudflare-ipfs.com/ipfs/QmU7BdRsm936vQvawJNzxfHEuChEf8GEKUhp4ADHjV6tnp?width=622&height=622"
            />
          </div>
          <div className="text-lg text-kashmir-blue-600">
            <p>Navigate with our extension for a full and smooth experience</p>
            <p className="">Download now!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepSuccess;
