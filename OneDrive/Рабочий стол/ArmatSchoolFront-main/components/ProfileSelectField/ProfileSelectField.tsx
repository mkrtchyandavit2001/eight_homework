"use client"

import type { SelectOption, SettingsIcon } from "@/types/settings";
import { useEffect, useId, useRef, useState } from "react";
import FieldLabel from "../FieldLabel/FieldLabel";
import { SettingsCheckIcon, SettingsChevronDownIcon } from "../icons/Icons";

interface SelectFieldProps {
  label: string;
  icon?: SettingsIcon;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  searchable?: boolean;
  placeholder?: string;
}

export default function ProfileSelectField({
  label,
  icon,
  value,
  options,
  onChange,
  className = "",
  searchable = true,
  placeholder = "Ընտրեք...",
}: SelectFieldProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // Փակել dropdown-ը դրսում սեղմելիս կամ Escape սեղմելիս
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearchQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Գտնում ենք ընտրված տարբերակը
  const current = options.find((o) => o.value === value);

  // Ֆիլտրում ենք տարբերակները ըստ որոնման տեքստի
  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opt.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex flex-col gap-3 py-[14px] ${className}`}
    >
      <FieldLabel htmlFor={id} icon={icon}>
        {label}
      </FieldLabel>

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[47px] w-full items-center gap-[10px] rounded-xl border bg-white px-3 text-left text-[14px] font-medium leading-[21px] text-[#2D2D2D] outline-none transition-colors ${
          open ? "border-[#F15A22]" : "border-[#EDEDED]"
        }`}
      >
        <div className="flex flex-1 items-center gap-2.5 truncate">
          {current ? (
            <>
              {/* Եթե value-ն 2-տառանի երկրի ISO կոդ է (օր. AM, US, AD), ցույց տալ դրոշի նկարը */}
              {current.value.length === 2 && (
                <img
                  src={`https://flagcdn.com/w20/${current.value.toLowerCase()}.png`}
                  alt={current.value}
                  className="h-3.5 w-5 rounded-[2px] object-cover"
                />
              )}
              <span className="truncate">{current.label}</span>
            </>
          ) : (
            <span className="text-[#999999]">{placeholder}</span>
          )}
        </div>

        <SettingsChevronDownIcon
          size={14}
          className={`shrink-0 text-[#666666] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 -mt-1 flex max-h-72 flex-col rounded-2xl border border-[#EDEDED] bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {/* 1. Որոնման Input դաշտը (նկարի համապատասխան) */}
          {searchable && (
            <div className="p-1 pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=""
                autoFocus
                className="w-full rounded-xl bg-[#F5F5F5] px-3 py-2 text-[14px] text-[#2D2D2D] outline-none placeholder-[#AAA]"
              />
            </div>
          )}

          {/* 2. Երկրների / տարբերակների ցուցակը */}
          <ul role="listbox" className="max-h-52 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const selected = opt.value === value;
                return (
                  <li key={opt.value} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                        setSearchQuery("");
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] transition-colors hover:bg-[#F7F7F7] ${
                        selected
                          ? "font-semibold text-[#F15A22]"
                          : "font-medium text-[#2D2D2D]"
                      }`}
                    >
                      {/* Դրոշի նկարը */}
                      {opt.value.length === 2 && (
                        <img
                          src={`https://flagcdn.com/w20/${opt.value.toLowerCase()}.png`}
                          alt={opt.value}
                          className="h-3.5 w-5 rounded-[2px] object-cover"
                        />
                      )}
                      <span className="flex-1 truncate">{opt.label}</span>
                      {selected && <SettingsCheckIcon size={14} />}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-3 text-center text-[13px] text-[#999999]">
                Արդյունք չի գտնվել
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}