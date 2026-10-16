"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { TimezoneModalProps } from "@/types/types";
import { ContinueArrowIcon, DropdownChevronIcon, TimezoneCheckIcon } from "../icons/Icons";


const TIMEZONE_VALUES = ["amt", "ct", "mt", "pt"] as const;

export default function TimezoneModal({
  isOpen = true,
  onClose,
  onContinue,
}: TimezoneModalProps) {
  const { dict } = useLanguage();
  const t = dict.timezoneModal;
  const alt = t.alt || { background: "Background", character: "Character" };

  const timezones = TIMEZONE_VALUES.map((value) => ({
    value,
    label: t.options[value],
  }));

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTimezones = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return timezones;
    return timezones.filter((tz) => tz.label.toLowerCase().includes(query));
  }, [timezones, searchQuery]);

  if (!isOpen) return null;

  const placeholder = t.placeholder ?? t.timezoneLabel;
  const canContinue = Boolean(selectedZone);

  const handleContinue = () => {
    if (!canContinue || !selectedZone) return;
    onContinue?.(selectedZone);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs font-['Plus_Jakarta_Sans']"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[1000px] h-[600px] bg-white rounded-[40px] shadow-[4px_4px_168.9px_-36px_rgba(0,0,0,0.25)] flex overflow-hidden"
      >
        {/* Left Section - Background & Character */}
        <div className="relative w-[402px] h-[600px] rounded-l-[40px] bg-[#FFF]">
          <div className="absolute inset-0">
            <Image
              src="/images/education_background.png"
              alt={t?.alt?.background || "Background"}
              fill
              className="object-cover object-left"
            />
          </div>
          <div className="absolute left-[79px] bottom-0 w-[399px] h-[599px]">
            <Image
              src="/images/hero.png"
              alt={t?.alt?.character || "Character"}
              fill
              className="object-contain z-50"
              priority
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="relative w-[596px] h-[600px] flex flex-col justify-start items-start px-[60px] pt-[40px] pb-[40px] gap-[32px]">

          {/* Close Button (uncomment and add CloseIcon to the imports to enable) */}
          {/* <button
            onClick={handleClose}
            className="absolute right-[40px] top-[40px] z-30 w-[16px] h-[16px] text-[#999999] hover:text-[#2D2D2D] transition-colors cursor-pointer"
            aria-label={t?.closeAriaLabel || "Close"}
          >
            <CloseIcon className="w-full h-full" />
          </button> */}

          {/* Logo */}
          <div className="w-[305px] h-[85px] relative flex-none">
            <Image
              src="/images/Orange_text+Black_hat_1.png"
              alt="Logo"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Frame 86 */}
          <div className="flex flex-col items-start gap-[16px] w-[476px] flex-none z-20">
            <h2 className="w-[476px] font-medium text-[30px] leading-[38px] text-gray-800 m-0">
              {t.title}
            </h2>

            <p className="w-[476px] font-normal text-[16px] leading-[20px] text-gray-600 m-0">
              {t.subtitle}
            </p>

            {/* SelectDropdown */}
            <div
              className="flex flex-col items-start w-[476px] pt-[2px] relative"
              ref={dropdownRef}
            >
              <span className="w-[476px] text-[14px] font-medium leading-[20px] text-gray-800 mb-[6px]">
                {t.timezoneLabel}
              </span>

              {/* Main Container */}
              <div className="relative w-full">
                <div
                  onClick={() => {
                    if (!isDropdownOpen) {
                      setIsDropdownOpen(true);
                      setSearchQuery("");
                    }
                  }}
                  className={`w-[476px] h-[46px] bg-white border rounded-[8px] px-[16px] flex items-center justify-between transition-all cursor-pointer ${
                    isDropdownOpen
                      ? "border-orange-500 shadow-[0px_0px_0px_2px_rgba(241,90,34,0.2)]"
                      : "border-gray-900/10 hover:border-orange-500"
                  }`}
                >
                  {isDropdownOpen ? (
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        selectedZone || (t.searchPlaceholder ?? "Որոնել...")
                      }
                      className="w-full h-full text-[14px] font-medium outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    />
                  ) : (
                    <span
                      className={`text-[14px] font-medium ${
                        selectedZone ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {selectedZone ?? placeholder}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen((prev) => !prev);
                      setSearchQuery("");
                    }}
                    className="focus:outline-none cursor-pointer p-1"
                  >
                    <DropdownChevronIcon
                      className={`w-[16px] h-[16px] text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                </div>

                {/* Dropdown Options List */}
                {isDropdownOpen && (
                  <div className="absolute top-[52px] left-0 w-full bg-white border border-gray-900/10 rounded-[8px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] z-50 overflow-hidden">
                    <div className="max-h-[200px] overflow-y-auto">
                      {filteredTimezones.length > 0 ? (
                        filteredTimezones.map((tz) => {
                          const isSelected = selectedZone === tz.label;
                          return (
                            <button
                              key={tz.value}
                              type="button"
                              onClick={() => {
                                setSelectedZone(tz.label);
                                setIsDropdownOpen(false);
                                setSearchQuery("");
                              }}
                              className={`w-full h-[40px] px-[16px] flex items-center justify-between text-[14px] font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "text-gray-800 hover:bg-gray-50"
                              }`}
                            >
                              <span>{tz.label}</span>
                              {isSelected && (
                                <TimezoneCheckIcon className="w-[10px] h-[7px]" />
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-[16px] py-[12px] text-[14px] text-gray-400">
                          {t.noResults ?? "Արդյունք չի գտնվել"}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="w-[476px] text-[14px] font-normal leading-[18px] text-gray-400 m-0 pt-[2px]">
              {t.helperText}
            </p>
          </div>

          {/* Bottom Action: Continue Button */}
          <div className="w-[476px] h-[46px] flex-none z-10 mt-auto">
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`w-full h-full rounded-[10px] flex items-center justify-center gap-[10px] text-[16px] font-medium transition-all shadow-xs ${
                canContinue
                  ? "text-orange-500 cursor-pointer"
                  : "text-orange-300 cursor-not-allowed"
              }`}
            >
              <span>{t.continue}</span>
              <ContinueArrowIcon className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}