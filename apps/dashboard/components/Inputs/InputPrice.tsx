import React, { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { useController, UseControllerProps } from 'react-hook-form';

import Input from './Input';

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  options?: unknown[];
  currency?: string;
}

const InputPrice: React.FC<Partial<UseControllerProps> & Props> = ({ label, options, currency, className, ...props }) => {
  return (
    <div className={clsx(className)}>
      {label && (
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow">
          <Input className="w-full rounded-none rounded-l-md focus:shadow-sm" {...props} />
        </div>
        {currency && (
          <p className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 ">
            <span className="uppercase">{currency}</span>
          </p>
        )}
        {options && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-none border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 outline-none focus:ring-0 sm:text-sm"
              onChange={(e) => console.log(e.target.value)}
            >
              <option>JUNOX</option>
              <option>JBEBS</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputPrice;
