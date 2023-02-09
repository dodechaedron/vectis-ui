import React from 'react';

import { Button } from './Buttons';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const FilterTable: React.FC = () => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex items-center justify-between rounded-md bg-white shadow-sm w-full p-2 cursor-not-allowed">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
      </div>
      <Button variant="primary" disabled className="cursor-not-allowed">
        Download
      </Button>
    </div>
  );
};

export default FilterTable;
