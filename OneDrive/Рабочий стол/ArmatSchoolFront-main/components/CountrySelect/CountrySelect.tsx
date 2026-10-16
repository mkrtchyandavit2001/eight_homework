"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useGetCountriesQuery } from "@/redux/slices/countriesSlice/countriesApi";
import Image from "next/image";
import type { CountrySelectProps } from "@/types/types";
import { ChevronDownIcon, SelectedCheckIcon } from "../icons/Icons";

function FlagIcon({ code, className }: { code: string; className?: string }) {
  return (
    <Image
      src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
      width={20}
      height={15}
      alt=""
      className={["rounded-[2px] object-cover shrink-0", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

// Ընդլայնում ենք props-ը, որպեսզի onChange-ը կարողանա ընդունել նաև id և name
interface ExtendedCountrySelectProps extends Omit<
  CountrySelectProps,
  "onChange"
> {
  onChange: (code: string, name: string, id: number) => void;
}

export default function CountrySelect({
  value,
  onChange,
  required,
  icon,
}: ExtendedCountrySelectProps) {
  const { locale, dict } = useLanguage();
  const t = dict?.freeLesson?.steps?.contactDetails ?? {};

  const { data: countriesResponse, isLoading } = useGetCountriesQuery(locale);
  const countries = countriesResponse?.data ?? [];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      requestAnimationFrame(() => {
        if (listRef.current) listRef.current.scrollTop = 0;
      });
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, countries]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [query]);

  // Այստեղ value-ն կարող է լինել երկրի կոդը (օրինակ՝ "AM")
  const selected = countries.find((c) => c.code === value);

  return (
    <div ref={wrapperRef} className="flex w-full flex-col gap-1.5">
      <label className="text-sm font-medium text-[#2D2D2D]">
        {t.country}
        {required && <span className="text-[#F15A22]"> *</span>}
      </label>

      <div ref={anchorRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={[
            "flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left",
            open
              ? "border-[#F15A22] shadow-[0_0_0_2px_rgba(245,130,32,0.2)]"
              : "border-[#EDEDED]",
          ].join(" ")}
        >
          {icon && <span className="flex shrink-0 items-center">{icon}</span>}

          <span
            className={`flex flex-1 items-center gap-2 text-sm font-medium ${value ? "text-[#2D2D2D]" : "text-[#C0C0C5]"}`}
          >
            {selected ? (
              <>
                <FlagIcon code={selected.code} />
                {selected.name}
              </>
            ) : (
              t.countryPlaceholder
            )}
          </span>
          <ChevronDownIcon
            className={
              open ? "rotate-180 transition-transform" : "transition-transform"
            }
          />
        </button>

        {open && (
          <div className="absolute top-[calc(100%+4px)] left-0 z-20 w-full overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-lg">
            <div className="p-2">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.countrySearchPlaceholder}
                className="w-full rounded-[14px] bg-[#F4F4F4] px-3 py-2 text-sm text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:outline-none"
              />
            </div>

            <div ref={listRef} className="max-h-[208px] overflow-y-auto py-1">
              {isLoading && (
                <p className="px-4 py-3 text-sm text-[#999999]">
                  Բեռնվում է...
                </p>
              )}
              {!isLoading && filtered.length === 0 && (
                <p className="px-4 py-3 text-sm text-[#999999]">
                  {t.countryNoResults}
                </p>
              )}
              {filtered.map((c) => {
                const active = c.code === value;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onChange(c.code, c.name, c.id); // c.id-ն integer է
                      setOpen(false);
                      setQuery("");
                    }}
                    className={[
                      "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-medium",
                      active
                        ? "bg-[#FFF4EA] text-[#F15A22]"
                        : "text-[#2D2D2D] hover:bg-[#F7F7F7]",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2.5">
                      <FlagIcon code={c.code} />
                      {c.name}
                    </span>
                    {active && <SelectedCheckIcon className="shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
