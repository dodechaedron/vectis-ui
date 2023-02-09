import React, { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

interface Props {
  address: string;
}

const Address: React.FC<Props & ComponentPropsWithoutRef<'p'>> = ({ address, className, ...props }) => {
  return (
    <p className={clsx('flex overflow-auto', className)} {...props}>
      <span className="truncate">{address.slice(0, -4)}</span>
      <span>{address.slice(address.length - 4)}</span>
    </p>
  );
};

export default Address;
