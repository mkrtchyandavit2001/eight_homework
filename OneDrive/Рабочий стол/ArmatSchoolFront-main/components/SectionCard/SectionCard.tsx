import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="flex flex-col rounded-2xl border-[0.67px] border-solid border-[#EDEDED] bg-white">
      <h3 className="border-b-[0.67px] border-solid border-[#EDEDED] px-6 py-4 text-base font-semibold leading-6 text-[#2D2D2D]">
        {title}
      </h3>
      {children}
    </section>
  );
}