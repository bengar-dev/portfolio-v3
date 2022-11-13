import React from "react";
import { FieldError, FieldErrorsImpl, FieldValues } from "react-hook-form";
import { format } from "date-fns";

interface InputDateProps {
  id: string;
  type: "date";
  label: string;
  field: FieldValues;
  errors?: FieldError | FieldErrorsImpl<any>;
  placeholder?: string;
}

export const InputDate = (props: InputDateProps) => {
  const { id, type, label, field, errors } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="p-1 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`p-2 rounded-md outline-none border border-slate-200 text-sm text-slate-800 ${
          errors && "border-red-500 bg-red-50"
        }`}
        onChange={field.onChange}
        value={field.value && format(new Date(field.value), "yyyy-MM-dd")}
      />
      <span className="text-xs text-red-500 text-right">
        {errors && String(errors?.message)}
      </span>
    </div>
  );
};
