import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Spinner from '../Spinner';

interface Props<C extends React.ElementType> {
  as?: C;
  variant?: 'primary' | 'secondary' | 'white';
  isLoading?: boolean;
}

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: Props<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>
) => React.ReactElement | null;

const Button: ButtonComponent = ({ children, className, as: AsComponent, variant = 'primary', isLoading, ...props }) => {
  const Component = AsComponent ? AsComponent : motion.button;
  return (
    <Component
      className={clsx(
        `flex items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 font-medium transition-all duration-150 ease-in disabled:cursor-not-allowed disabled:opacity-25`,
        className,
        {
          'bg-kashmir-blue-500 text-white hover:brightness-110 ': variant?.includes('primary'),
          'bg-kashmir-blue-100 text-kashmir-blue-700 hover:bg-kashmir-blue-200': variant?.includes('secondary'),
          'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50':
            variant?.includes('white')
        }
      )}
      {...props}
    >
      {isLoading ? <Spinner className={variant.includes('primary') ? 'border-white' : 'border-kashmir-blue-500'} /> : children}
    </Component>
  );
};

export default Button;
