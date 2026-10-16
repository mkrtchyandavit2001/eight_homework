// components/contact/ContactInfoCard.tsx
import type { ContactInfoItem } from "@/types/contact";

export default function ContactInfoCard({ label, value, href, icon }: Omit<ContactInfoItem, "id">) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#EDEDED] bg-white p-6">
      <div className="pt-0.5">
        <div className="flex size-11  items-center justify-center rounded-[14px] bg-primary-soft text-primary">
          {icon}
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="text-xs uppercase leading-[18px] tracking-[1px] text-subtle">
          {label}
        </p>
        <p className="pt-1 text-[15px] leading-[22px] text-ink">
          {href ? (
            <a href={href} className="break-words transition hover:text-primary">
              {value}
            </a>
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
}