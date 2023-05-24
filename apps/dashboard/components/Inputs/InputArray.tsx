import React from 'react';
import { Control, Controller, FieldErrorsImpl, useFieldArray } from 'react-hook-form';

import { Button } from '../Buttons';

import Input from './Input';

import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { IoAddCircleOutline } from 'react-icons/io5';

interface Props {
  name: string;
  errors?: (string | undefined)[];
  control: Control<any>;
}

const InputArray: React.FC<Props> = ({ control, name, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  return (
    <ul>
      {fields.length ? null : (
        <div
          className="group my-4 w-full cursor-pointer border border-dashed border-gray-400 p-2 hover:border-gray-700"
          onClick={() => append({ address: '' })}
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 group-hover:text-gray-700">
            <IoAddCircleOutline className="h-5 w-5" />
            <span className="capitalize"> {name.replace('s', '')}</span>
          </div>
        </div>
      )}
      {fields.map((field, index) => (
        <li className="relative flex w-full items-center justify-center gap-2 py-2" key={field.id}>
          <Controller
            control={control}
            name={`${name}.${index}.address`}
            render={({ field }) => <Input {...field} placeholder={`#${index + 1} ${name} `} />}
          />
          {errors?.[index] && <p className="absolute top-12 w-full text-start text-xs text-pink-900">{errors[index]}</p>}
          <div className="flex w-28 items-center">
            <TrashIcon className="m-2 w-6 cursor-pointer" onClick={() => remove(index)} />
            <PlusIcon className="m-2 w-6 cursor-pointer" onClick={() => append({ address: '' })} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InputArray;
