import React, { useEffect, useState } from 'react';
import { useVectis } from 'providers';

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
  const { account } = useVectis();
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const handlerCopy = () => {
    copyToClipboard(account.address);
    setToolTipVisible(true);
    setTimeout(() => setToolTipVisible(false), 1500);
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row gap-4 h-full">
      <div className="flex flex-1 items-center flex-col h-full gap-6">
        <div className="flex gap-4 xl:gap-8 rounded-md w-full flex-col lg:flex-row">
          <div className="hidden lg:flex flex-col items-center flex-star gap-4">
            <QRCode className="mx-auto rounded-lg !w-30 !h-30 border" />
            <Tooltip anchorId="copy-address" visible={toolTipVisible} />
            <Button id="copy-address" data-tooltip-content="copied" className="w-full" onClick={handlerCopy}>
              Copy Address
            </Button>
          </div>
          <SmartCardOverview />
        </div>
        <Transactions defaultLimit={8} />
      </div>
      <div className="flex flex-col gap-4 lg:w-[30%] h-full">
        <CardOptions />
        <BalanceCard />
        <TokenAllocation />
        <PluginSection />
      </div>
    </div>
  );
};

export default Dashboard;
