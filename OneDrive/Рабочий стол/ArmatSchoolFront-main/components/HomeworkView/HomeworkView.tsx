"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HOMEWORK, MOCK_NOW } from "@/data/dashboardHomework";
import { isOnTime } from "@/lib/homework";
import type {
  Homework,
  HomeworkItem,
  HomeworkSubmission,
  HomeworkText,
} from "@/types/dashboard";
import HomeworkCard from "../HomeworkCard/HomeworkCard";
import HomeworkSummary from "../HomeworkSummary/HomeworkSummary";
import HomeworkGradedList from "../HomeworkGradedList/HomeworkGradedList";
import DashTopbar from "../DashTopbar/DashTopbar";

type Override = Pick<Homework, "status" | "submittedAt">;

export default function HomeworkView() {
  const { dict } = useLanguage();
  const t = dict.dashboard.homework;
  const texts = t.items as HomeworkText[];

  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [expandedId, setExpandedId] = useState<string | null>(HOMEWORK[0]?.id ?? null);

  const items: HomeworkItem[] = useMemo(
    () =>
      HOMEWORK.map((hw) => ({
        ...hw,
        ...(texts.find((x) => x.id === hw.id) as HomeworkText),
        ...overrides[hw.id],
      })),
    [texts, overrides]
  );

  const stats = useMemo(() => {
    const pending = items.filter((i) => i.status === "pending" || i.status === "retry").length;
    const submitted = items.filter((i) => i.status === "submitted").length;
    const gradedItems = items.filter((i) => i.status === "graded");
    const handedIn = items.filter((i) => i.submittedAt);
    const onTime = handedIn.filter((i) => isOnTime(i.submittedAt!, i.deadlineAt)).length;

    return {
      pending,
      submitted,
      gradedItems,
      onTimeRate: handedIn.length ? Math.round((onTime / handedIn.length) * 100) : null,
    };
  }, [items]);

  const handleSubmit = (id: string, submission: HomeworkSubmission) => {
    // TODO: ուղարկել backend (submission.text, submission.files)
    void submission;
    setOverrides((prev) => ({
      ...prev,
      [id]: { status: "submitted", submittedAt: MOCK_NOW },
    }));
    setExpandedId(null);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <DashTopbar title={t.title} />

      <div className="flex flex-col items-start gap-4 p-5 lg:flex-row">
        <section className="flex w-full min-w-0 flex-1 flex-col gap-4 rounded-2xl bg-white p-6">
          {items.map((item) => (
            <HomeworkCard
              key={item.id}
              item={item}
              now={MOCK_NOW}
              expanded={expandedId === item.id}
              onToggle={() => setExpandedId((cur) => (cur === item.id ? null : item.id))}
              onSubmit={handleSubmit}
            />
          ))}
          <p className="text-[10px] leading-[15px] text-[#AAA]">{t.deadlineNote}</p>
        </section>

        <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[352px]">
          <HomeworkSummary
            pending={stats.pending}
            submitted={stats.submitted}
            graded={stats.gradedItems.length}
            onTimeRate={stats.onTimeRate}
          />
          <HomeworkGradedList items={stats.gradedItems} />
        </aside>
      </div>
    </div>
  );
}