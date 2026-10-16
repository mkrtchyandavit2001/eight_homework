import type { SettingsIcon } from "@/types/settings";
import type { ReactNode } from "react";

interface FieldLabelProps {
  htmlFor?: string;
  icon?: SettingsIcon;
  children: ReactNode;
}

export default function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-3 text-[13px] font-semibold leading-5 text-[#999999]"
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      <span>{children}</span>
    </label>
  );
}
