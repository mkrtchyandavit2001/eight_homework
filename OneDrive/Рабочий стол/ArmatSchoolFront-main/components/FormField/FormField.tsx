// components/FormField/FormField.tsx
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

type BaseProps = {
  id: string;
  label?: string;
  icon?: ReactNode;
};

type InputFieldProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
    multiline?: false;
  };

type TextareaFieldProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
    multiline: true;
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps;

const fieldClassName =
  "w-full bg-transparent text-[15px] text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:outline-none";

export default function FormField(props: FormFieldProps) {
  // Pull out our own props so they never get spread onto the DOM element
  const { id, label, icon, multiline, ...rest } = props;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#2D2D2D]">
          {label}
          {rest.required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div
        className={`flex gap-3 rounded-2xl border border-[#EDEDED] bg-[#F7F7F7] px-4 py-3 ${
          multiline ? "items-start" : "items-center"
        }`}
      >
        {icon && <span className="shrink-0 text-[#999999]">{icon}</span>}

        {multiline ? (
          <textarea
            id={id}
            rows={5}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`${fieldClassName} resize-none`}
          />
        ) : (
          <input
            id={id}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className={fieldClassName}
          />
        )}
      </div>
    </div>
  );
}