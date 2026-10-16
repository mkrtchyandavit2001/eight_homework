"use client";

import { useLanguage } from "@/context/LanguageContext";
import { intlLocaleOf } from "@/lib/calendar";
import type { UpdateItem } from "@/types/dashboard";
import { DashMegaphoneIcon } from "../icons/Icons";

interface UpdatesListProps {
  items: UpdateItem[];
  readIds: Set<string>;
}

export default function UpdatesList({ items, readIds }: UpdatesListProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.messages.updates;
  const intlLocale = intlLocaleOf(locale);

  if (items.length === 0) {
    return <p className="p-10 text-center text-[13px] text-[#999]">{t.empty}</p>;
  }

  return (
    <ul className="flex flex-col gap-3 overflow-y-auto p-5">
      {items.map((item) => {
        const unread = !readIds.has(item.id);
        return (
          <li
            key={item.id}
            className={`flex gap-3 rounded-xl border border-solid p-4 ${
              unread ? "border-[#F15A22]/40 bg-[#FFF5F2]" : "border-[#EDEDED] bg-white"
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#F15A22]">
              <DashMegaphoneIcon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">{item.title}</p>
                <span className="shrink-0 text-[11px] leading-4 text-[#999]">
                  {new Intl.DateTimeFormat(intlLocale, { month: "short", day: "numeric" }).format(
                    new Date(item.sentAt)
                  )}
                </span>
              </div>
              <p className="pt-1 text-xs leading-[18px] text-[#666]">{item.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}