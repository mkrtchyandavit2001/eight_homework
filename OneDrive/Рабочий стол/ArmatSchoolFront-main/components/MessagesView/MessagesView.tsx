"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { INITIAL_MESSAGES, STUDENT_TZ, TEACHER_TZ, UPDATES } from "@/data/dashboardMessages";
import { intlLocaleOf } from "@/lib/calendar";
import { nowLocalIso } from "@/lib/time";
import type { ChatMessage, MessagesTab, UpdateItem, UpdateText } from "@/types/dashboard";
import DashTopbar from "../DashTopbar/DashTopbar";
import MessageTabs from "../MessageTabs/MessageTabs";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "../MessageComposer/MessageComposer";
import TimezoneCard from "../TimezoneCard/TimezoneCard";
import UpdatesList from "../UpdatesList/UpdatesList";


export default function MessagesView() {
  const { dict, locale } = useLanguage();
  const t = dict.dashboard.messages;
  const intlLocale = intlLocaleOf(locale);

  const [tab, setTab] = useState<MessagesTab>("teacher");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [readUpdates, setReadUpdates] = useState<Set<string>>(new Set());
  const [tzOpen, setTzOpen] = useState(false);

  // Ժամանակը՝ միայն client-ում (hydration mismatch-ից խուսափելու համար)
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const updates: UpdateItem[] = useMemo(() => {
    const texts = t.updates.items as UpdateText[];
    return UPDATES.map((u) => ({ ...u, ...(texts.find((x) => x.id === u.id) as UpdateText) }));
  }, [t.updates.items]);

  const unreadUpdates = updates.filter((u) => !readUpdates.has(u.id)).length;

  const handleTab = (next: MessagesTab) => {
    // Թարմացումները համարվում են կարդացված՝ երբ դուրս ենք գալիս այդ tab-ից
    if (tab === "updates" && next !== "updates") {
      setReadUpdates(new Set(updates.map((u) => u.id)));
    }
    setTab(next);
    setTzOpen(false);
  };

  const handleSend = (text: string, attachments: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        from: "student",
        sentAt: nowLocalIso(),
        text,
        attachments: attachments.length ? attachments : undefined,
      },
    ]);
  };

  // Ավտոմատ scroll դեպի վերջին հաղորդագրությունը
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, tab]);

  const closeTz = useCallback(() => setTzOpen(false), []);

  const formatDay = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, { month: "short", day: "numeric", year: "numeric" }).format(
      new Date(iso)
    );

  return (
    // h-dvh + overflow-hidden՝ էջը չի սքրոլվում, սքրոլը մնում է միայն չաթի ներսում
    <div className="flex h-dvh min-w-0 flex-1 flex-col overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <DashTopbar title={t.title} />

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-5">
        <MessageTabs active={tab} unreadUpdates={unreadUpdates} onChange={handleTab} />

        <section className="relative flex min-h-0 flex-1 flex-col rounded-2xl border border-solid border-[#EDEDED] bg-white">
          {tab === "teacher" ? (
            <>
              <ChatHeader
                now={now}
                teacherTz={TEACHER_TZ}
                tzOpen={tzOpen}
                onToggleTz={() => setTzOpen((o) => !o)}
              />

              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
                {messages.map((m, i) => {
                  const newDay = i === 0 || messages[i - 1].sentAt.slice(0, 10) !== m.sentAt.slice(0, 10);
                  return (
                    <div key={m.id} className="flex flex-col gap-3">
                      {newDay && (
                        <p className="text-center text-xs leading-[18px] text-[#666]">
                          {formatDay(m.sentAt)}
                        </p>
                      )}
                      <MessageBubble message={m} />
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>

              <MessageComposer onSend={handleSend} />

              {tzOpen && now && (
                <TimezoneCard now={now} studentTz={STUDENT_TZ} teacherTz={TEACHER_TZ} onClose={closeTz} />
              )}
            </>
          ) : (
            <UpdatesList items={updates} readIds={readUpdates} />
          )}
        </section>
      </div>
    </div>
  );
}