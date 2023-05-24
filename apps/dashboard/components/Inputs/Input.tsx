import React from 'react';
import clsx from 'clsx';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface Input {
  label?: string;
  error?: string;
  helpText?: string;
  container?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & Input>(
  ({ className, label, helpText, container = 'w-full', error, ...props }, ref) => {
    return (
      <>
        <div className={clsx('relative flex flex-col gap-1', container)}>
          {label && <label className="block text-left text-sm font-medium text-gray-900">{label}</label>}
          <input
            ref={ref}
            className={clsx(
              `rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm outline-none transition-all focus:shadow-md disabled:cursor-help`,
              className && className
            )}
            {...props}
          />
          {error && <p className="absolute bottom-[-18px] w-full text-left text-xs text-pink-900">{error}</p>}
          {helpText && (
            <p className="mt-2 text-sm text-gray-500" id="email-description">
              {helpText}
            </p>
          )}
        </div>
      </>
    );
  }
);

Input.displayName = 'Input';
export default Input;
