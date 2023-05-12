import React from 'react';
import clsx from 'clsx';

import { CheckIcon } from '@heroicons/react/24/solid';

interface Props {
  steps: { id: number; name: string }[];
  currentStep: number;
  changeStep: (step: number) => void;
}

const ProgressWizard: React.FC<Props> = ({ steps, currentStep, changeStep }) => {
  return (
    <ol role="list" className="w-full max-w-7xl overflow-hidden rounded-md lg:flex lg:border-l lg:border-r lg:border-gray-200">
      {steps.map((step, stepIdx) => (
        <li key={step.id} className="relative overflow-hidden bg-white lg:flex-1">
          <div
            className={clsx(
              stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
              stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
              'overflow-hidden border border-gray-200 lg:border-0'
            )}
          >
            {stepIdx < currentStep ? (
              <div className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-kashmir-blue-500">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                </span>
              </div>
            ) : stepIdx === currentStep ? (
              <div className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-kashmir-blue-500">
                  <span className="text-kashmir-blue-500">{'0' + step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-kashmir-blue-500">{step.name}</span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 ">
                    <span className="text-gray-500 ">{'0' + step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 ">{step.name}</span>
                </span>
              </div>
            )}

            <Separator index={stepIdx} />
          </div>
        </li>
      ))}
    </ol>
  );
};

export default ProgressWizard;

const Separator: React.FC<{ index: number }> = ({ index }) => {
  if (!index) return null;

  return (
    <div className="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
      <svg className="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
        <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};
