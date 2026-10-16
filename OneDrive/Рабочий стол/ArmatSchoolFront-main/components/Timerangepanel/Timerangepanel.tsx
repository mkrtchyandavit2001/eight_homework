"use client";

import type { TimeRange } from "@/types/course";
import { TIME_SLOTS } from "@/types/types";
import { useEffect, useRef } from "react";


interface Props {
  value: TimeRange;
  fromLabel: string;
  toLabel: string;
  onChange: (next: TimeRange) => void;
}

/** Figma "Frame 234": երկու սյունակ (From | To), յուրաքանչյուրը 62×139px */
export function TimeRangePanel({ value, fromLabel, toLabel, onChange }: Props) {
  // From և To-ն իրարից անկախ են՝ մեկի փոփոխությունը մյուսին չի ազդում
  const pick = (key: keyof TimeRange, slot: string) =>
    onChange({ ...value, [key]: slot });

  return (
    <div className="flex items-start justify-between gap-3 px-[30px]">
      <Column
        label={fromLabel}
        slots={TIME_SLOTS}
        selected={value.from}
        onPick={(s) => pick("from", s)}
      />
      <Column
        label={toLabel}
        slots={TIME_SLOTS}
        selected={value.to}
        onPick={(s) => pick("to", s)}
      />
    </div>
  );
}

function Column({
  label,
  slots,
  selected,
  onPick,
}: {
  label: string;
  slots: string[];
  selected: string;
  onPick: (slot: string) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  // ընտրված ժամը բերում ենք տեսանելի մասի կենտրոն
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (list && item) {
      list.scrollTop = item.offsetTop - (list.clientHeight - item.offsetHeight) / 2;
    }
  }, [selected]);

  return (
    <ul
      ref={listRef}
      role="listbox"
      aria-label={label}
      className="relative flex h-[139px] w-[62px] flex-col gap-1.5 overflow-y-auto rounded-lg bg-white py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {slots.map((slot) => {
        const active = slot === selected;
        return (
          <li
            key={slot}
            role="option"
            aria-selected={active}
            className="shrink-0"
          >
            <button
              type="button"
              onClick={() => onPick(slot)}
              className={`block h-[19px] w-full text-center text-[13px] leading-[19px] transition-colors ${
                active
                  ? "font-medium text-[#F15A22]"
                  : "text-[#666666] hover:text-[#2D2D2D]"
              }`}
            >
              {slot}
            </button>
          </li>
        );
      })}
    </ul>
  );
}