import type { BackLinkProps } from "@/types/types";

export default function BackLink({ href = "/", label }: BackLinkProps) {
  return (
    <a href={href} className="text-sm font-medium leading-[21px] text-muted transition-colors hover:text-brand">
      {label}
    </a>
  );
}