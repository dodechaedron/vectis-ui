import { ComponentPropsWithoutRef, Fragment, useState } from "react";
import clsx from "clsx";

import { Listbox, Transition } from "@headlessui/react";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Props extends Omit<ComponentPropsWithoutRef<"button">, "onChange" | "value"> {
  label?: string;
  onChange?: (e: { value: string; label: string }) => void;
  value: { value: string; label: string };
  options: { value: string; label: string }[];
  checkMark?: boolean;
}

const InputSelector: React.FC<Props> = ({ label, className, value, onChange, options, checkMark, ...props }) => {
  const [state, setState] = useState<{ value: string; label: string }>(value);
  const _onChange = (e: { value: string; label: string }) => {
    onChange?.(e);
    setState(e);
  };
  return (
    <Listbox value={state} onChange={_onChange}>
      {({ open }) => (
        <>
          <div className="relative w-full">
            {label && <Listbox.Label className="mb-2 block w-full text-left text-sm font-medium text-gray-700">{label}</Listbox.Label>}
            <Listbox.Button
              className={clsx(
                className,
                "focus:ring-none relative cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none sm:text-sm"
              )}
              {...props}
            >
              <span className="block truncate text-sm">{state.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-kashmir-blue-500 hover:text-white"
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className={clsx(selected ? "font-semibold" : "font-normal", "block truncate text-left text-sm")}>
                          {option.label}
                        </span>

                        {selected && checkMark ? (
                          <span
                            className={clsx("absolute inset-y-0 right-0 flex items-center pr-4 text-kashmir-blue-500 group-hover:text-white")}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default InputSelector;
