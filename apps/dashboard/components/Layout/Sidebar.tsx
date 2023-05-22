import React from 'react';
import clsx from 'clsx';

import AccountDisplay from '../AccountDisplay';

import MenuLinks from './MenuLinks';

interface Props {
  visible: boolean;
  setVisible: () => void;
  seeAccounts: () => void;
}

const Sidebar: React.FC<Props> = ({ visible, setVisible, seeAccounts }) => {
  return (
    <div
      className={clsx(
        'fixed z-50 h-[calc(100vh-72px)] w-full bg-white transition-all md:sticky md:top-[4.5rem]  md:max-w-[250px] ',
        'flex-1 flex-col items-start justify-between',
        visible ? 'left-0' : 'left-[-100vw] md:left-0'
      )}
    >
      <AccountDisplay seeAccounts={seeAccounts} />

      <MenuLinks closeMenu={setVisible} />
    </div>
  );
};

export default Sidebar;
