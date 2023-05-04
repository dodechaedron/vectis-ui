import React from 'react';
import Link from 'next/link';

import { Button } from './Buttons';

import { PlusIcon } from '@heroicons/react/24/solid';

const PluginSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <p>Plugins</p>
      <div className="flex min-h-[15.3rem] flex-col items-center justify-center gap-2 rounded-md bg-white px-4 py-4 shadow-sm sm:px-6">
        <div>
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="text-sm font-medium text-gray-900">No Plugins</h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">Plugins are optional helpers installable on your smart account</p>
        <Button>
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          <Link href="/plugins">Install Plugin</Link>
        </Button>
      </div>
    </div>
  );
};

export default PluginSection;
