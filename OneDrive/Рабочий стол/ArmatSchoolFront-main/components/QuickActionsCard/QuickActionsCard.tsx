"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UPCOMING_LESSON } from "@/data/dashboardProfile";
import { DashHelpCircleIcon, DashUploadIcon, DashVideoIcon } from "../icons/Icons";

const rowClass =
  "flex w-full items-center gap-3 rounded-[14px] px-3.5 py-2.5 text-left text-sm font-medium leading-5 text-[#2D2D2D] hover:bg-[#F7F7F7]";

function ActionIcon({ children }: { children: ReactNode }) {
  return <span className="text-[#F15A22]">{children}</span>;
}

export default function QuickActionsCard() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.profile.learning;

  return (
    <section className="flex flex-col rounded-2xl border-[0.67px] border-solid border-[#EDEDED] bg-white">
      <h3 className="border-b-[0.67px] border-solid border-[#EDEDED] px-5 py-4 text-sm font-semibold leading-5 text-[#2D2D2D]">
        {t.quickActions}
      </h3>

      <div className="flex flex-col gap-1 p-3">
        <a href={UPCOMING_LESSON.meetUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
          <ActionIcon>
            <DashVideoIcon size={16} />
          </ActionIcon>
          {t.joinMeet}
        </a>

        <Link href={`/${locale}/profile/homework`} className={rowClass}>
          <ActionIcon>
            <DashUploadIcon size={16} />
          </ActionIcon>
          {t.uploadHomework}
        </Link>

        <Link href={`/${locale}/contact`} className={rowClass}>
          <ActionIcon>
            <DashHelpCircleIcon size={16} />
          </ActionIcon>
          {t.supportCenter}
        </Link>
      </div>
    </section>
  );
}