"use client";

import { useLanguage } from "@/context/LanguageContext";
import { intlLocaleOf } from "@/lib/calendar";
import type { ChatMessage } from "@/types/dashboard";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { locale } = useLanguage();
  const mine = message.from === "student";

  const time = new Intl.DateTimeFormat(intlLocaleOf(locale), {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale !== "hy",
  }).format(new Date(message.sentAt));

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[70%] flex-col ${mine ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-[13px] leading-[21px] ${
            mine ? "bg-[#F15A22] text-white" : "bg-[#F4F4F4] text-[#2D2D2D]"
          }`}
        >
          {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}

          {message.attachments?.map((name) => (
            <p
              key={name}
              className={`mt-1 truncate rounded-md px-2 py-1 text-xs ${
                mine ? "bg-white/20" : "bg-white"
              }`}
            >
              📎 {name}
            </p>
          ))}
        </div>
        <span className="pt-1 text-[10px] leading-[15px] text-[#2D2D2D] opacity-60">{time}</span>
      </div>
    </div>
  );
}