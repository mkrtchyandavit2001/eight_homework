import type { ReactNode } from "react";

interface SettingsRowProps {
  title: string;
  description?: string;
  action: ReactNode;
  bordered?: boolean;
}

export default function SettingsRow({
  title,
  description,
  action,
  bordered = true,
}: SettingsRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 ${
        bordered ? "border-b border-[#E5E5E7]" : ""
      }`}
    >
      <div className="min-w-0">
        <p className="text-[14px] font-semibold leading-[21px] text-[#2D2D2D]">
          {title}
        </p>
        {description && (
          <p className="text-[12px] leading-[18px] text-[#999999]">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}
