import Link from "next/link";
import type { ArticlePrevNextProps } from "@/types/types";
import { ArrowRightIcon } from "../icons/Icons";



export default function ArticlePrevNext({
  previous,
  next,
  previousLabel,
  nextLabel,
}: ArticlePrevNextProps) {
  if (!previous && !next) return null;

  return (
    <div className="mt-12 flex gap-5 border-t border-[#EDEDED] pt-8 max-md:flex-col">
      {previous ? (
        <Link
          href={previous.href}
          className="flex flex-1 items-center gap-4 rounded-[18px] border border-[#EDEDED] bg-white p-6 hover:border-[#F15A22]/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#EDEDED]">
            <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          </span>
          <div>
            <p className="text-[11px] font-medium text-[#999999]">{previousLabel}</p>
            <p className="mt-1 text-sm font-medium text-[#2D2D2D]">{previous.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex flex-1 items-center justify-end gap-4 rounded-[18px] border border-[#F15A22] bg-white p-6"
        >
          <div className="text-right">
            <p className="text-[11px] font-medium text-[#999999]">{nextLabel}</p>
            <p className="mt-1 text-sm font-semibold text-[#F15A22]">{next.title}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#EDEDED]">
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}