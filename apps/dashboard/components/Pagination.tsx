import React from 'react';
import clsx from 'clsx';

import { Button } from './Buttons';

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Props {
  page: number;
  setPage: (page: number) => void;
  pages: number;
  limit: number;
  total: number;
}

const Pagination: React.FC<Props> = ({ page, setPage, pages, limit, total }) => {
  const start = pages - page < 3 ? pages - 4 : page - 1;

  const arrayOfPages = Array.from({ length: pages }, (_, i) => i + 1).slice(start, page + 3);
  const buttons = arrayOfPages.map((b) => {
    return (
      <button
        key={b}
        onClick={() => setPage(b)}
        className={clsx(
          {
            'relative z-10 inline-flex items-center border border-kashmir-blue-500 bg-kashmir-blue-50 px-4 py-2 text-sm font-medium text-kashmir-blue-600 focus:z-20':
              b === page
          },
          'relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex'
        )}
      >
        {b}
      </button>
    );
  });

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-md">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button variant="secondary" className="w-24">
          Previous
        </Button>
        <Button variant="secondary" className="w-24">
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">from {limit * (page - 1)}</span> to{' '}
            <span className="font-medium">{total < limit * page ? total : limit * page}</span> of <span className="font-medium">{total}</span>{' '}
            results
          </p>
        </div>
        <div>
          {total > limit && (
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {buttons}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pages}
                className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setPage(pages)}
                disabled={page === pages}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
