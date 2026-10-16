import type { SectionHeaderProps } from "@/types/types";

export default function CoursesSectionHeader({
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-col items-center self-stretch">
      <div className="flex items-center gap-2 pb-4 text-orange-500">
        <div className="w-[6px] h-[6px] bg-[#F15A22] rounded-full" />
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-[16px] tracking-[1.1px] uppercase text-[#F15A22]">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-center text-[34px] font-semibold capitalize leading-[150%] text-ink sm:text-[50px]">
        {title}
      </h2>
    </header>
  );
}
