import React from "react";
import type { BookingWidgetProps } from "@/types/types";
import { CalendarEmptyIcon, CheckIcon, ChevronArrow, ClockIcon, VideoIcon } from "../icons/Icons";

export default function BookingWidget({
  t,
  year,
  month,
  monthLabel,
  weekdayLabels,
  calendarCells,
  selectedDay,
  selectedTime,
  slots,
  isCurrentMockMonth,
  selectedDateLabel,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  onSelectTime,
  onConfirm,
}: BookingWidgetProps) {
  const SCHEDULED_DAYS = new Set([14, 17, 24, 28, 31]);

  // Ստանում ենք ընթացիկ (այսօրվա) տարին, ամիսը և օրը
  const todayDate = new Date();
  const currentTodayNum = todayDate.getDate();
  const currentTodayMonth = todayDate.getMonth(); // 0-indexed (0 - Հունվար, 1 - Փետրվար...)
  const currentTodayYear = todayDate.getFullYear();

  return (
    <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0px_2px_24px_rgba(24,24,27,0.07)] overflow-hidden">
      {/* Widget header */}
      <div className="border-b-2 border-gray-100 px-[24px] py-[20px] flex items-center justify-between flex-wrap gap-[12px]">
        <div>
          <h2 className="text-[16px] font-semibold text-orange-500">
            {t.widgetTitle ?? "Armat · Free Trial Lesson"}
          </h2>
          <div className="flex items-center gap-[12px] pt-[4px]">
            <span className="flex items-center gap-[4px] text-[12px] text-gray-600">
              <ClockIcon /> {t.duration ?? "2 hr"}
            </span>
            <span className="flex items-center gap-[4px] text-[12px] text-gray-600">
              <VideoIcon /> {t.online ?? "Online"}
            </span>
            <span className="text-[12px] font-semibold text-orange-500">{t.free ?? "Free"}</span>
          </div>
        </div>
        <div className="flex items-center gap-[6px] px-[10px] py-[6px] border-b border-orange-500">
          <VideoIcon className="w-[13px] h-[13px] text-orange-500" />
          <span className="text-[12px] text-orange-500">{t.online ?? "Online"}</span>
        </div>
      </div>

      {/* Calendar + slots */}
      <div className="flex items-stretch flex-wrap md:flex-nowrap">
        {/* Calendar */}
        <div className="flex-1 min-w-0 border-r border-gray-100">
          <div className="flex items-center justify-between px-[24px] py-[8px] border-b-[0.67px] border-gray-100">
            <button
              type="button"
              onClick={onPrevMonth}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-[22px] hover:bg-gray-25"
              aria-label={t.prevMonthAriaLabel ?? "Previous month"}
            >
              <ChevronArrow direction="left" />
            </button>
            <span className="text-[14px] font-medium text-gray-800 capitalize">{monthLabel}</span>
            <button
              type="button"
              onClick={onNextMonth}
              className="w-[32px] h-[32px] flex items-center justify-center rounded-[22px] hover:bg-gray-25"
              aria-label={t.nextMonthAriaLabel ?? "Next month"}
            >
              <ChevronArrow direction="right" />
            </button>
          </div>

          <div className="p-[20px]">
            <div className="grid grid-cols-7">
              {weekdayLabels.map((label) => (
                <div key={label} className="py-[8px] text-center">
                  <span className="text-[11px] font-semibold uppercase text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 pt-[8px]">
              {calendarCells.map((day, idx) => {
                if (day === null) return <div key={`blank-${idx}`} className="h-[40px]" />;

                const isSelected = isCurrentMockMonth && day === selectedDay;
                const hasLesson = isCurrentMockMonth && SCHEDULED_DAYS.has(day);

                // Ստուգում ենք՝ արդյոք տվյալ վանդակը հանդիսանում է իրական «Այսօր» (Today)-ը
                const isToday =
                  day === currentTodayNum &&
                  month === currentTodayMonth &&
                  year === currentTodayYear;

                return (
                  <div key={day} className="h-[40px] flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onSelectDay(day)}
                      className={`flex flex-col items-center justify-center gap-[2px] w-[36px] h-[36px] transition-colors ${
                        isSelected
                          ? "text-orange-500 font-semibold border-b-2 border-orange-500 rounded-none"
                          : "text-gray-600 hover:bg-gray-25 rounded-full"
                      }`}
                    >
                      <span className={`${isSelected ? "text-[14px] font-semibold text-orange-500" : ""}`}>
                        {day}
                      </span>

                      {/* Scheduled lesson կետիկ (եթե ընտրված չէ և այսօր չէ) */}
                      {hasLesson && !isSelected && !isToday && (
                        <span className="w-[6px] h-[6px] rounded-full bg-orange-500/60" />
                      )}

                      {/* Today կետիկ (եթե այսօր է և ընտրված չէ) */}
                      {isToday && !isSelected && (
                        <span className="w-[6px] h-[6px] rounded-full bg-orange-500" />
                      )}

                      {/* Selected day կետիկ (ընտրված օրվա համար) */}
                      {isSelected && (
                        <span className="w-[6px] h-[6px] rounded-full bg-orange-500" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between px-[24px] py-[12px] flex-wrap gap-[8px]">
            <div className="flex items-center gap-[20px]">
              <span className="flex items-center gap-[6px] text-[12px] text-gray-400">
                <span className="w-[8px] h-[8px] rounded-full bg-orange-500/60" />
                {t.legendScheduled ?? "Lesson scheduled"}
              </span>
              <span className="flex items-center gap-[6px] text-[12px] text-gray-400">
                <span className="w-[8px] h-[8px] rounded-full bg-orange-500" />
                {t.legendToday ?? "Today"}
              </span>
            </div>

            {selectedDateLabel && (
              <div className="flex items-center gap-[6px] text-[12px]">
                <span className="text-gray-600">{t.selectedSlotLabel ?? "Selected slot"}</span>
                <span className="w-px h-[16px] bg-gray-100" />
                <span className="font-medium text-gray-800">{selectedDateLabel}</span>
                {selectedTime && <span className="font-medium text-orange-500">{selectedTime}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Time slots */}
        <div className="w-full md:w-[257px] shrink-0 p-[20px] flex flex-col justify-center">
          {selectedDay ? (
            <>
              <div className="pb-[16px]">
                <p className="text-[12px] font-semibold text-gray-800">{selectedDateLabel}</p>
                <p className="text-[12px] text-gray-400 pt-[2px]">{t.pickTimeSlot ?? "Pick a time slot"}</p>
              </div>

              <div className="border border-gray-100 rounded-[12px]">
                {slots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => onSelectTime(slot.time)}
                      className={`w-full flex items-center justify-between px-[16px] py-[10px] border-b border-gray-900/10 last:border-b-0 transition-colors ${
                        !slot.available
                          ? "opacity-50 cursor-not-allowed"
                          : isSelected
                          ? "text-orange-500"
                          : "text-gray-800 hover:bg-gray-25"
                      }`}
                    >
                      <span className="flex items-center gap-[8px] text-[14px] font-medium">
                        <ClockIcon className={`w-[13px] h-[13px] ${isSelected ? "text-orange-500" : "text-gray-400"}`} />
                        {slot.time}
                      </span>
                      {isSelected && <CheckIcon />}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!selectedTime}
                onClick={onConfirm}
                className={`w-full py-[16px] text-[14px] font-medium text-center ${
                  selectedTime ? "text-orange-500 cursor-pointer" : "text-orange-300 cursor-not-allowed"
                }`}
              >
                {t.confirmBooking ?? "Confirm Booking"}
              </button>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-[24px]">
              <div className="w-[64px] h-[64px] rounded-[24px] bg-gray-50 flex items-center justify-center mb-[16px]">
                <CalendarEmptyIcon />
              </div>
              <p className="text-[14px] font-semibold text-gray-800 pb-[6px]">
                {t.pickDateFirstTitle ?? "Pick a date first"}
              </p>
              <p className="text-[12px] leading-[20px] text-gray-400 max-w-[176px]">
                {t.pickDateFirstBody ?? "Choose any highlighted date on the calendar to see available times."}
              </p>
              <div className="flex items-center gap-[6px] pt-[20px]">
                <span className="w-[6px] h-[6px] rounded-full bg-orange-500/90" />
                <span className="text-[12px] text-orange-500">{t.slotsAvailableThisMonth ?? "Slots available this month"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}