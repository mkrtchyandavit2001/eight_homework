"use client";

import React, { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FaqSection from "@/components/Faq_section/FaqSection";
import BookingWidget from "@/components/BookingWidget/BookingWidget";
import BookingFooter from "@/components/BookingFooter/BookingFooter";
import HeroSection from "@/components/HeroSection/HeroSection";
import type { FaqItem, FreeTrialBookingPageProps, TimeSlot } from "@/types/types";

const MOCK_YEAR = 2026;
const MOCK_MONTH = 6; // July (0-indexed)

const DEFAULT_SELECTED_DAY: number | null = null;
const DEFAULT_SELECTED_TIME: string | null = null;

const SLOTS_BY_DAY: Record<number, TimeSlot[]> = {
  20: [
    { time: "10:00", available: false },
    { time: "12:00", available: true },
    { time: "14:00", available: false },
    { time: "16:00", available: true },
    { time: "18:00", available: false },
    { time: "20:00", available: true },
    { time: "22:00", available: true },
  ],
};

const DEFAULT_SLOTS: TimeSlot[] = [
  { time: "10:00", available: true },
  { time: "12:00", available: true },
  { time: "14:00", available: true },
  { time: "16:00", available: true },
  { time: "18:00", available: true },
  { time: "20:00", available: true },
  { time: "22:00", available: true },
];

const FAQ_FALLBACK: FaqItem[] = [
  {
    q: "Can I reschedule my lesson?",
    a: "Yes, absolutely. You can reschedule up to 24 hours before your lesson at no charge. Simply reply to your confirmation email or contact our support team.",
  },
  {
    q: "How long is the trial lesson?",
    a: "The free trial lesson lasts 2 hours and is conducted entirely online with one of our teachers.",
  },
  {
    q: "Is it really completely free?",
    a: "Yes — the trial lesson is 100% free, with no hidden charges and no obligation to continue.",
  },
  {
    q: "What do I need for the lesson?",
    a: "Just a stable internet connection, a camera/microphone, and a quiet place to focus for the session.",
  },
];

function getWeekdayLabels(locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const base = new Date(Date.UTC(2023, 0, 1));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setUTCDate(base.getUTCDate() + i);
    return formatter.format(d).toUpperCase();
  });
}

function getCalendarCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from(
    { length: firstWeekday },
    () => null,
  );
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function FreeTrialBookingPage({
  onConfirm,
}: FreeTrialBookingPageProps) {
  const { dict } = useLanguage();
  const t = dict.freeTrialBooking ?? {};
  const locale = dict.locale ?? "en";

  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(
    DEFAULT_SELECTED_DAY,
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    DEFAULT_SELECTED_TIME,
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const viewDate = useMemo(() => {
    const d = new Date(MOCK_YEAR, MOCK_MONTH, 1);
    d.setMonth(d.getMonth() + monthOffset);
    return d;
  }, [monthOffset]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale]);
  const calendarCells = useMemo(
    () => getCalendarCells(year, month),
    [year, month],
  );
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(viewDate),
    [locale, viewDate],
  );

  const isCurrentMockMonth = year === MOCK_YEAR && month === MOCK_MONTH;
  const slots = selectedDay ? (SLOTS_BY_DAY[selectedDay] ?? DEFAULT_SLOTS) : [];
  const faqItems: FaqItem[] =
    t.faq && Array.isArray(t.faq) && t.faq.length > 0 ? t.faq : FAQ_FALLBACK;

  const selectedDateLabel =
    selectedDay && isCurrentMockMonth
      ? new Intl.DateTimeFormat(locale, {
          month: "long",
          day: "numeric",
        }).format(new Date(year, month, selectedDay))
      : null;

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (!selectedDay || !selectedTime) return;
    const dateLabel =
      selectedDateLabel ??
      new Intl.DateTimeFormat(locale, { month: "long", day: "numeric" }).format(
        new Date(year, month, selectedDay),
      );
    onConfirm?.({ dateLabel, timeLabel: selectedTime });
  };

  return (
    <div className="min-h-[832px] bg-gray-25">
      <main className="max-w-[1280px] mx-auto px-[24px] py-[80px]">
        <HeroSection
          titleLine1={t.heroTitleLine1}
          titleLine2={t.heroTitleLine2}
          badge={t.heroBadge}
          subtitle={t.heroSubtitle}
        />

        <section className="flex items-start gap-[24px] pt-[40px] flex-wrap lg:flex-nowrap">
          <FaqSection
            faqItems={faqItems}
            openFaqIndex={openFaqIndex}
            onToggleFaq={(idx) =>
              setOpenFaqIndex(openFaqIndex === idx ? null : idx)
            }
            imageAlt={t.imageAlt}
          />

          <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
            <BookingWidget
              t={t}
              locale={locale}
              year={year}
              month={month}
              monthLabel={monthLabel}
              weekdayLabels={weekdayLabels}
              calendarCells={calendarCells}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              slots={slots}
              isCurrentMockMonth={isCurrentMockMonth}
              selectedDateLabel={selectedDateLabel}
              onPrevMonth={() => setMonthOffset((m) => m - 1)}
              onNextMonth={() => setMonthOffset((m) => m + 1)}
              onSelectDay={handleSelectDay}
              onSelectTime={(time) => setSelectedTime(time)}
              onConfirm={handleConfirm}
            />

            <BookingFooter t={t} year={MOCK_YEAR} />
          </div>
        </section>
      </main>
    </div>
  );
}