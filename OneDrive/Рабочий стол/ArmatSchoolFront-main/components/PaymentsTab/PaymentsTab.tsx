"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PAYMENTS } from "@/data/dashboardProfile";
import { intlLocaleOf } from "@/lib/calendar";
import type { PaymentItem, PaymentText } from "@/types/dashboard";

export default function PaymentsTab() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.payments;
  const texts = t.items as PaymentText[];

  const rows: PaymentItem[] = useMemo(
    () =>
      PAYMENTS.map((p) => ({
        ...p,
        ...(texts.find((x) => x.id === p.id) as PaymentText),
      })),
    [texts]
  );

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(intlLocaleOf(locale), {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${iso}T00:00`));

  const renderRow = (row: PaymentItem) => (
    <>
      <div className="flex min-w-0 flex-col">
        <p className="text-sm font-medium leading-5 text-[#2D2D2D]">{row.title}</p>
        <p className="pt-0.5 text-xs leading-4 text-[#999]">{formatDate(row.date)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm font-medium leading-5 text-[#2D2D2D]">${row.amount}</span>
        <span
          className={`rounded px-2.5 py-1 text-xs font-medium leading-4 text-[#F15A22] ${
            row.status === "unpaid" ? "bg-[#F15A22]/10" : "bg-[#F7F7F7]"
          }`}
        >
          {t.status[row.status]}
        </span>
      </div>
    </>
  );

  return (
    <section className="flex flex-col rounded-xl border-[0.67px] border-solid border-[#EDEDED] bg-white">
      <h3 className="border-b-[0.67px] border-solid border-[#EDEDED] px-6 py-4 text-base font-semibold leading-6 text-[#2D2D2D]">
        {t.title}
      </h3>

      <ul className="flex flex-col pb-3">
        {rows.map((row, i) =>
          row.status === "unpaid" ? (
            <li
              key={row.id}
              className="flex items-center justify-between rounded-lg border-[0.5px] border-dashed border-[#F15A22] bg-[#F15A22]/5 px-6 py-3"
            >
              {renderRow(row)}
            </li>
          ) : (
            <li key={row.id} className="px-6">
              <div
                className={`flex items-center justify-between py-3 ${
                  i < rows.length - 1 ? "border-b-[0.67px] border-solid border-[#F4F4F4]" : ""
                }`}
              >
                {renderRow(row)}
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}