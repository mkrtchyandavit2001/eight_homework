import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "danger";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
  default:
    "border-[#E5E5E7] text-[#666666] hover:border-[#F15A22] hover:text-[#F15A22]",
  danger:
    "border-[#FFC9C9] bg-[#FEF2F2] text-[#E7000B] hover:bg-[#FFE4E4]",
};

export default function OutlineButton({
  variant = "default",
  className = "",
  type = "button",
  ...props
}: OutlineButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-9 items-center justify-center rounded-lg border px-4 text-[12px] font-medium leading-[18px] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
