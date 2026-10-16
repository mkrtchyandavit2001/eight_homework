"use client";

import { useLanguage } from "@/context/LanguageContext";

import { fillTemplate, timeLeft } from "@/lib/homework";
import { intlLocaleOf } from "@/lib/calendar";
import type { HomeworkItem, HomeworkSubmission } from "@/types/dashboard";
import { DashAlertCircleIcon, DashCalendarIcon, DashChevronDownIcon, DashClockIcon, DashDownloadIcon } from "../icons/Icons";
import HomeworkSubmitForm from "../HomeworkSubmitForm/HomeworkSubmitForm";

interface HomeworkCardProps {
  item: HomeworkItem;
  now: string;
  expanded: boolean;
  onToggle: () => void;
  onSubmit: (id: string, submission: HomeworkSubmission) => void;
}

export default function HomeworkCard({ item, now, expanded, onToggle, onSubmit }: HomeworkCardProps) {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.homework;
  const intlLocale = intlLocaleOf(locale);

  const isRetry = item.status === "retry";
  const canSubmit = item.status === "pending" || isRetry;

  const assigned = new Date(item.assignedAt);
  const assignedText = `${new Intl.DateTimeFormat(intlLocale, { month: "long", day: "numeric" }).format(
    assigned
  )} · ${new Intl.DateTimeFormat(intlLocale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: locale !== "hy",
  }).format(assigned)}`;

  const deadlineText = fillTemplate(t.deadline, {
    date: new Intl.DateTimeFormat(intlLocale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(item.deadlineAt)),
  });

  let dueText: string | null = null;
  if (canSubmit) {
    const left = timeLeft(item.deadlineAt, now);
    if (left) {
      dueText = fillTemplate(left.days > 0 ? t.dueIn : t.dueInHours, left);
    }
  }

  const StatusIcon =
    item.status === "retry" ? DashAlertCircleIcon : item.status === "overdue" ? DashClockIcon : null;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white ${
        expanded && isRetry ? "border-dashed border-[#F15A22]" : "border-solid border-[#EDEDED]"
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-medium leading-[22px] text-[#2D2D2D]">{item.title}</h3>
            <span className="rounded-md border border-solid border-[#E8E8E8] bg-[#F5F5F5] px-[7px] py-0.5 text-[10px] font-medium leading-[15px] text-[#555]">
              {t.types[item.type]}
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-xs leading-[18px] text-[#999]">
            <DashCalendarIcon size={12} />
            {assignedText}
          </p>

          <div className="flex flex-wrap gap-x-4 text-[11px] leading-4">
            <span className="text-[#999]">{deadlineText}</span>
            {dueText && <span className="text-[#666]">{dueText}</span>}
          </div>

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-[#F0F0F0] px-1.5 py-px text-[10px] leading-[15px] text-[#888]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 text-[#F15A22]">
          <span className="text-[11px] font-semibold leading-4">{t.status[item.status]}</span>
          {StatusIcon && <StatusIcon size={14} />}
          <DashChevronDownIcon
            size={14}
            className={`transition-transform ${expanded ? "rotate-180 text-[#F15A22]" : "text-[#CCC]"}`}
          />
        </div>
      </button>

      {/* Panel */}
      {expanded && (
        <div className="flex flex-col border-t-[0.67px] border-solid border-[#EDEDED] bg-[#F7F7F7] p-5">
          <h4 className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">{t.instructions}</h4>
          <p className="pt-2 text-[13px] leading-[21px] text-[#666]">{item.instructions}</p>

          {canSubmit && (
            <HomeworkSubmitForm retry={isRetry} onSubmit={(s) => onSubmit(item.id, s)} />
          )}

          {item.status === "graded" && (
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-solid border-[#EDEDED] bg-white p-5">
              <h4 className="text-sm font-medium leading-[21px] text-[#2D2D2D]">{t.teacherFeedback}</h4>
              {item.feedback && (
                <p className="text-sm leading-6 text-[#F26438]">{item.feedback}</p>
              )}
              <div className="flex items-center justify-end gap-3">
                <span className="text-xl font-medium leading-[30px] text-[#F15A22]">
                  {item.score}/100
                </span>
                <button
                  type="button"
                  // TODO: ներբեռնում backend-ից
                  className="flex flex-1 items-center justify-end gap-1.5 text-xs font-medium leading-4 text-[#F15A22]"
                >
                  <DashDownloadIcon size={14} />
                  {t.download}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}