import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SettingsCard({
  title,
  children,
  className = "",
}: SettingsCardProps) {
  return (
    <section
      className={`flex w-full flex-col rounded-[22px] border border-[#E5E5E7] bg-white p-7 ${className}`}
    >
      <h2 className="text-[17px] font-semibold leading-[26px] text-[#2D2D2D]">
        {title}
      </h2>
      <div className="pt-6">{children}</div>
    </section>
  );
}
