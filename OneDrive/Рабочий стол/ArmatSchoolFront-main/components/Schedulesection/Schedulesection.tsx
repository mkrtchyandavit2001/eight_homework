"use client";

import { DAY_KEYS, TIME_ZONES } from "@/data/coursedetail";
import type { CourseDetailDictionary, DayKey, SchedulePreferences, TimeRange } from "@/types/course";
import { useState } from "react";
import { TimeRangePanel } from "../Timerangepanel/Timerangepanel";
import { getCityName, getGmtOffset } from "@/lib/format";
import { ChevronDownIcon, CloseIcon } from "../icons/Icons";



interface Props {
  t: CourseDetailDictionary["schedule"];
  value: SchedulePreferences;
  onChange: (next: SchedulePreferences) => void;
  timeZone: string;
  onTimeZoneChange: (tz: string) => void;
}

const DEFAULT_RANGE: TimeRange = { from: "16:00", to: "20:00" };

export function ScheduleSection({
  t,
  value,
  onChange,
  timeZone,
  onTimeZoneChange,
}: Props) {
  const [openDay, setOpenDay] = useState<DayKey | null>(null);
  const selected = DAY_KEYS.filter((d) => value[d]);

  const toggleDay = (day: DayKey) => {
    const next = { ...value };
    if (next[day]) {
      delete next[day];
      if (openDay === day) setOpenDay(null);
    } else {
      next[day] = DEFAULT_RANGE;
    }
    onChange(next);
  };

  const setRange = (day: DayKey, range: TimeRange) =>
    onChange({ ...value, [day]: range });

  const tzOptions = TIME_ZONES.includes(timeZone as never)
    ? TIME_ZONES
    : [timeZone, ...TIME_ZONES];

  return (
    <section className="flex flex-col rounded-2xl border border-[#EDEDED] bg-white px-3 py-6">
      <header>
        <h3 className="text-xl font-medium leading-[150%] text-[#2D2D2D]">{t.title}</h3>
        <p className="pt-1 text-xs font-light leading-[150%] text-[#666666]">{t.description}</p>
      </header>

      {/* Days */}
      <div className="flex flex-col py-5">
        <span className="px-2.5 text-[13px] font-medium leading-5 text-[#2D2D2D]">
          {t.preferredDays}
        </span>
        <div className="grid grid-cols-2 gap-2 px-4 pt-3">
          {DAY_KEYS.map((day) => {
            const active = !!value[day];
            return (
              <button
                key={day}
                type="button"
                aria-pressed={active}
                onClick={() => toggleDay(day)}
                className={`rounded-lg border border-[#EDEDED] bg-white px-4 py-2 text-center text-[13px] leading-[19px] transition-colors hover:border-[#F15A22]/40 ${
                  active ? "font-medium text-[#F15A22]" : "text-[#666666]"
                }`}
              >
                {t.days[day]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected days + time range */}
      {selected.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl bg-[#F7F7F7] px-4 py-3">
          {selected.map((day) => {
            const range = value[day]!;
            const open = openDay === day;
            const toggleOpen = () => setOpenDay(open ? null : day);

            return (
              <div key={day} className="flex flex-col gap-3">
                <div className="flex items-start">
                  <span className="flex-1 text-[13px] font-medium leading-5 text-[#2D2D2D]">
                    {t.days[day]}
                  </span>
                  <button
                    type="button"
                    aria-label={`${t.removeDay}: ${t.days[day]}`}
                    onClick={() => toggleDay(day)}
                    className="text-[#999999] hover:text-[#2D2D2D]"
                  >
                    <CloseIcon size={13} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <TimeButton label={t.from} value={range.from} open={open} onClick={toggleOpen} />
                  <span className="pt-4 text-[13px] leading-5 text-[#999999]">–</span>
                  <TimeButton label={t.to} value={range.to} open={open} onClick={toggleOpen} />
                </div>

                {open && (
                  <TimeRangePanel
                    value={range}
                    fromLabel={t.from}
                    toLabel={t.to}
                    onChange={(r) => setRange(day, r)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Time zone */}
      <div className="flex flex-col gap-1.5 pt-4">
        <span className="text-xs font-semibold leading-5 text-[#2D2D2D]">{t.timeZone}</span>
        <div className="flex flex-col gap-1.5 rounded-xl bg-[#F7F7F7] p-4">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-sm font-medium leading-[21px] text-[#666666]">
              {getCityName(timeZone)}
            </span>
            <span className="text-xs font-light leading-[18px] text-[#999999]">
              {timeZone} · {getGmtOffset(timeZone)}
            </span>
          </div>
          <div className="relative">
            <select
              value={timeZone}
              onChange={(e) => onTimeZoneChange(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-[#EDEDED] bg-white pl-1.5 pr-8 text-xs text-[#2D2D2D] outline-none focus:border-[#F15A22]"
            >
              {tzOptions.map((tz) => (
                <option key={tz} value={tz}>
                  {tz} ({getGmtOffset(tz)})
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size={10}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />
          </div>
          <p className="pt-1 text-[11px] leading-4 text-[#999999]">{t.timeZoneNote}</p>
        </div>
      </div>
    </section>
  );
}

function TimeButton({
  label,
  value,
  open,
  onClick,
}: {
  label: string;
  value: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <span className="text-[11px] leading-[17px] text-[#999999]">{label}</span>
      <button
        type="button"
        aria-expanded={open}
        onClick={onClick}
        className={`h-[33px] w-full rounded-lg border bg-white px-2 text-center text-[13px] text-[#2D2D2D] transition-colors ${
          open ? "border-[#F15A22]" : "border-[#EDEDED]"
        }`}
      >
        {value}
      </button>
    </div>
  );
}