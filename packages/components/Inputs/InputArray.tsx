import React from "react";
import { Control,Controller, useFieldArray } from "react-hook-form";

import Input from "./Input";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

interface Props {
  name: string;
  error?: string;
  control: Control<any>;
}

const InputArray: React.FC<Props> = ({ control, name, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <ul>
      {fields.map((field, index) => (
        <li className="flex w-full items-center gap-2 py-2" key={field.id}>
          <Controller
            control={control}
            name={`${name}.${index}.value`}
            render={({ field }) => <Input {...field} placeholder={`#${index + 1} ${name} `} />}
          />
          <div className="flex w-28">
            {fields.length > 1 && <TrashIcon className="w-6 m-2 cursor-pointer" onClick={() => remove(index)} />}
            {index === fields.length - 1 && <PlusIcon className="w-6 m-2 cursor-pointer" onClick={() => append({ value: "" })} />}
          </div>
        </li>
      ))}
      {error && <p className="text-pink-900 text-xs w-full text-start">{error}</p>}
    </ul>
  );
};

export default InputArray;
