import React, { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';

interface Props {
  text: string;
  icon: ElementType;
}

const NotFound: React.FC<Props & ComponentPropsWithoutRef<'div'>> = ({ text, icon: Icon, className, ...props }) => {
  return (
    <div className={clsx('flex flex-1 flex-col justify-center items-center h-full p-6', className)} {...props}>
      <div className="w-16 h-16 rounded-full bg-kashmir-blue-100/20 flex items-center justify-center">
        <Icon className="w-8 h-8 text-kashmir-blue-500" />
      </div>
      <p className="text-sm text-gray-900 font-medium mt-2">{text}</p>
    </div>
  );
};

export default NotFound;
