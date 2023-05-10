import React, { useEffect, useState } from 'react';
import { useApp } from 'providers';

import { copyToClipboard } from '~/services/browser';

import BalanceCard from './BalanceCard';
import { Button } from './Buttons';
import CardOptions from './CardOptions';
import PluginSection from './PluginSection';
import QRCode from './QRCode';
import SmartCardOverview from './SmartCardOverview';
import TokenAllocation from './TokenAllocation';
import Tooltip from './Tooltip';
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
        <div className="flex w-full flex-col gap-4 rounded-md lg:flex-row xl:gap-8">
          <div className="flex-star hidden flex-col items-center gap-4 lg:flex">
            <QRCode className="!w-30 !h-30 mx-auto rounded-lg border" />
            <Tooltip anchorId="copy-address" visible={toolTipVisible} />
            <Button id="copy-address" data-tooltip-content="copied" className="w-full" onClick={handlerCopy}>
              Copy Address
            </Button>
          </div>
          <SmartCardOverview />
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
