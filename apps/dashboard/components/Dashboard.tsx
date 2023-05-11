import React, { useEffect, useState } from 'react';
import { useVectis } from 'providers';

import { copyToClipboard } from '~/services/browser';

import BalanceCard from './BalanceCard';
import CardOptions from './CardOptions';
import FakeGraph from './FakeGraph';
import PluginSection from './PluginSection';
import SmartCardOverview from './SmartCardOverview';
import TokenAllocation from './TokenAllocation';
import Transactions from './Transactions';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4 xl:flex-row">
      <div className="flex h-full flex-1 flex-col items-center gap-6">
        <div className="grid w-full grid-cols-1 gap-4 rounded-md lg:grid-cols-2 ">
          <SmartCardOverview />
          <FakeGraph />
        </div>
        <Transactions defaultLimit={8} />
      </div>
      <div className="flex h-full flex-col gap-4 xl:w-[30%]">
        <CardOptions />
        <BalanceCard />
        <TokenAllocation />
        <PluginSection />
      </div>
    </div>
  );
};

export default Dashboard;
