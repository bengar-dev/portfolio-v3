import { FieldError, FieldErrorsImpl, FieldValues } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  field: FieldValues;
  errors?: FieldError | FieldErrorsImpl<any>;
}

export const TextArea = (props: TextAreaProps) => {
  const { id, label, field, errors } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="p-1 text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        className={`p-2 h-32 resize-y rounded-md outline-none border border-slate-200 text-sm text-slate-800 ${
          errors && "border-red-500 bg-red-50"
        }`}
        {...field}
      />
      <span className="text-xs text-red-500 text-right">
        {errors && String(errors?.message)}
      </span>
    </div>
  );
};
