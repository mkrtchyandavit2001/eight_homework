import Link from "next/link";
import type { BackToBlogLinkProps } from "@/types/types";
import { ArrowRightIcon } from "../icons/Icons";



export default function BackToBlogLink({
  href = "/blog",
  label = "Back to Blog",
}: BackToBlogLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 pb-7.5 text-sm font-semibold text-[#2D2D2D] hover:text-[#F15A22]"
    >
      <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
      {label}
    </Link>
  );
}