import {
  Path,
  FieldValues,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  errors: FieldErrors<TFieldValue>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
};

export default function Input<TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  errors,
  onBlur,
  formText,
}: InputProps<TFieldValue>) {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name)}
        onBlur={onBlurHandler}
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-in-out"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs font-medium">
          {errors[name]?.message as string}
        </p>
      )}
      {formText && <p className="text-gray-500 text-xs">{formText}</p>}
    </div>
  );
}
