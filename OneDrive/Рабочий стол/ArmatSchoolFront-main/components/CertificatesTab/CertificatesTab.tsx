"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CERTIFICATES } from "@/data/dashboardProfile";
import { intlLocaleOf } from "@/lib/calendar";
import { fillTemplate } from "@/lib/homework";
import type { CertificateItem, CertificateText } from "@/types/dashboard";
import SectionCard from "../SectionCard/SectionCard";
import { DashAwardIcon, DashDownloadIcon } from "../icons/Icons";

export default function CertificatesTab() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.certificates;
  const texts = t.items as CertificateText[];

  const items: CertificateItem[] = useMemo(
    () =>
      CERTIFICATES.map((c) => ({
        ...c,
        ...(texts.find((x) => x.id === c.id) as CertificateText),
      })),
    [texts]
  );

  const issued = (iso: string) =>
    fillTemplate(t.issued, {
      date: new Intl.DateTimeFormat(intlLocaleOf(locale), {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(`${iso}T00:00`)),
      teacher: dict.dashboard.profile.learning.teacherName,
    });

  return (
    <SectionCard title={t.title}>
      {items.length === 0 ? (
        <p className="p-10 text-center text-[13px] text-[#999]">{t.empty}</p>
      ) : (
        <ul className="flex flex-col gap-4 p-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border-[0.67px] border-solid border-[#EDEDED] p-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#FFF5F2] text-[#F15A22]">
                  <DashAwardIcon size={24} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-5 text-[#2D2D2D]">{item.title}</p>
                  <p className="pt-0.5 text-xs leading-4 text-[#999]">{issued(item.issuedAt)}</p>
                </div>
              </div>

              <a
                href={item.fileUrl}
                download
                className="flex items-center gap-1.5 rounded-[10px] border-[0.67px] border-solid border-[#EDEDED] px-4 py-2 text-sm font-medium leading-5 text-[#2D2D2D] hover:border-[#F15A22] hover:text-[#F15A22]"
              >
                <DashDownloadIcon size={14} />
                {t.download}
              </a>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}   