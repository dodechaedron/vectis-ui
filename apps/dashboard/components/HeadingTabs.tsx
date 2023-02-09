import { useMemo, useState } from 'react';
import clsx from 'clsx';

import InputSelector from './Inputs/InputSelector';

interface Tab {
  name: string;
  component: React.FC<any>;
  props?: any;
  disabled: boolean;
}

interface Props {
  tabs: Tab[];
  defaultTab: string;
}

const HeadingTabs: React.FC<Props> = ({ tabs, defaultTab }) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab);

  const { component: Component, props } = useMemo(() => tabs.find((t) => t.name === selectedTab) as Tab, [tabs, selectedTab]);
  return (
    <>
      <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
        <div className="mt-3 sm:mt-4">
          <InputSelector
            className="w-full lg:hidden"
            options={tabs.map((t) => ({ label: t.name, value: t.name }))}
            value={{ label: defaultTab, value: defaultTab }}
            onChange={({ value }) => setSelectedTab(value)}
          />

          <div className="hidden lg:block">
            <nav className="-mb-px flex space-x-8 overflow-x-scroll scrollbar-none">
              {tabs.map((tab) => (
                <div
                  key={tab.name}
                  onClick={() => setSelectedTab(tab.name)}
                  className={clsx('cursor-pointer whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium', {
                    'border-kashmir-blue-500 text-kashmir-blue-600': selectedTab === tab.name,
                    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': selectedTab !== tab.name,
                    'cursor-not-allowed text-gray-300 hover:border-none hover:text-gray-300': tab.disabled
                  })}
                >
                  {tab.name}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Component {...props} />
    </>
  );
};

export default HeadingTabs;
