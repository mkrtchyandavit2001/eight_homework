// components/contact/FormField.tsx
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface BaseProps {
  id: string;
  label: string;
  className?: string;
}

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

const controlClasses =
  "w-full rounded-[14px] border border-line bg-surface px-4 py-3 text-sm text-ink " +
  "placeholder:text-[rgba(10,10,10,0.5)] outline-none transition " +
  "focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15";

export default function ContactFormField(props: InputProps | TextareaProps) {
  const { id, label, className = "" } = props;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[13px] font-semibold leading-5 text-ink">
        {label}
      </label>

      {props.multiline ? (
        (() => {
          const { multiline, label: _l, className: _c, ...rest } = props;
          return <textarea {...rest} className={`${controlClasses} min-h-[110px] resize-y leading-[21px]`} />;
        })()
      ) : (
        (() => {
          const { multiline, label: _l, className: _c, ...rest } = props;
          return <input {...rest} className={controlClasses} />;
        })()
      )}
    </div>
  );
}