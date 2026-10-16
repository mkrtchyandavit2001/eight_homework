import type { SectionHeaderProps } from "@/types/types";
import Link from "next/link";
import { ArrowRightIcon } from "../icons/Icons";


export default function SectionHeader({
  title,
  description,
  viewAllLabel,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <div className="flex w-full flex-wrap items-end justify-between gap-4">
      <div className="max-w-[540px]">
        <h2 className="text-[28px] leading-[42px] tracking-[-0.5px] font-semibold text-[#2D2D2D]">
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-6 text-[#666666]">{description}</p>
      </div>

      {viewAllLabel && viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-2 text-sm font-semibold text-[#F15A22] hover:opacity-80"
        >
          {viewAllLabel}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}