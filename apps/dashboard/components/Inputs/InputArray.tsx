import React from 'react';
import { Control, Controller, FieldErrorsImpl, useFieldArray } from 'react-hook-form';

import Input from './Input';

import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';

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
      {fields.map((field, index) => (
        <li className="relative flex w-full items-center justify-center gap-2 py-2" key={field.id}>
          <Controller
            control={control}
            name={`${name}.${index}.address`}
            render={({ field }) => <Input {...field} placeholder={`#${index + 1} ${name} `} />}
          />
          {errors?.[index] && <p className="absolute top-12 w-full text-start text-xs text-pink-900">{errors[index]}</p>}
          <div className="flex w-28 items-center">
            {fields.length > 1 && <TrashIcon className="m-2 w-6 cursor-pointer" onClick={() => remove(index)} />}
            {index === fields.length - 1 && <PlusIcon className="m-2 w-6 cursor-pointer" onClick={() => append({ address: '' })} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InputArray;
