import React, { useEffect, useState } from 'react';
import { useApp } from 'providers';

import { copyToClipboard } from '~/services/browser';

import BalanceCard from './BalanceCard';
import CardOptions from './CardOptions';
import FakeGraph from './FakeGraph';
import PluginSection from './PluginSection';
import SmartCardOverview from './SmartCardOverview';
import TokenAllocation from './TokenAllocation';
import Transactions from './Transactions';

const Dashboard: React.FC = () => {
  const { account } = useApp();
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const handlerCopy = () => {
    copyToClipboard(account.address);
    setToolTipVisible(true);
    setTimeout(() => setToolTipVisible(false), 1500);
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:flex-row">
      <div className="flex h-full flex-1 flex-col items-center gap-6">
        <div className="flex w-full flex-col gap-4 rounded-md lg:flex-row">
          <SmartCardOverview />
          <FakeGraph />
        </div>
        <Transactions defaultLimit={8} />
      </div>
      <div className="flex h-full flex-col gap-4 lg:w-[30%]">
        <CardOptions />
        <BalanceCard />
        <TokenAllocation />
        <PluginSection />
      </div>
    </div>
  );
};

export default Dashboard;
