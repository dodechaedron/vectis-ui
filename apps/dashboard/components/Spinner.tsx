import React, { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  wrapper?: boolean;
}

const styles = { sm: 'w-7 h-7 border-[3px]', md: 'h-12 w-12 border-4' };

const Spinner: React.FC<ComponentPropsWithoutRef<'div'> & Props> = ({ className, wrapper = false, size = 'sm' }) => {
  const spinner = (
    <div className={clsx(styles[size], className, 'animate-spin rounded-full border-solid border-kashmir-blue-500 border-t-transparent')} />
  );
  if (!wrapper) return spinner;

  return <div className="flex h-screen w-screen flex-1 items-center justify-center">{spinner}</div>;
};

export default Spinner;
