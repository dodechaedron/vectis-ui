import React, { useState } from 'react';
import clsx from 'clsx';
import SmartAccountMiniCard from 'components/SmartAccountMiniCard';

import MenuLinks from './MenuLinks';

interface Props {
  visible: boolean;
  setVisible: () => void;
}

const Sidebar: React.FC<Props> = ({ visible, setVisible }) => {
  return (
    <div
      className={clsx(
        'absolute z-50 h-[calc(100vh-75px)] w-full bg-white transition-all md:sticky md:top-[4.5rem]  md:max-w-[250px] ',
        'flex-1 flex-col items-start justify-between',
        visible ? 'left-0' : 'left-[-100vw] md:left-0'
      )}
    >
      <MenuLinks closeMenu={setVisible} />
      <div className="flex w-full flex-col items-center justify-between gap-4 p-4">
        <SmartAccountMiniCard />
      </div>
    </div>
  );
};

export default Sidebar;
