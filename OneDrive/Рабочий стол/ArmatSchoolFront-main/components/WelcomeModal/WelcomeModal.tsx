"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { WelcomeModalProps } from "@/types/types";



export default function WelcomeModal({
  isOpen = true,
  onClose,
  onContinueLearning,
  onViewCalendar,
  userName = "Emma Jan!",
}: WelcomeModalProps) {
  const { dict, locale } = useLanguage();
  const t = dict.welcomeModal;
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewCalendar = () => {
    if (onViewCalendar) {
      onViewCalendar();
    }
    router.push(`/${locale}/calendar`);
    if (onClose) onClose();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs font-['Plus_Jakarta_Sans'] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[1000px] h-[332px] bg-white rounded-[40px] shadow-[4px_4px_168.9px_-36px_rgba(0,0,0,0.25)] flex flex-col justify-center items-start px-[80px] overflow-hidden isolate"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/greeting-boy.png"
            alt={t.altBackground}
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        {/* Decorative Object Image */}
        <div className="absolute w-[78px] h-[98px] right-[28px] top-[71px] z-10 pointer-events-none">
          <Image
            src="/images/same_language.png"
            alt={t.altDecoration}
            fill
            className="object-contain"
          />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-[42px] top-[38px] z-30 w-[16px] h-[16px] text-[#999999] hover:text-[#2D2D2D] transition-colors cursor-pointer"
          aria-label={t.closeAriaLabel}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="#999999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Content Wrapper */}
        <div className="relative z-20 flex flex-col items-start gap-[30px] w-[300px]">
          <div className="flex flex-col items-start gap-[16px] w-[300px]">
            <div className="flex flex-col items-start gap-[0px] w-[218px]">
              <h2 className="font-semibold text-[30px] leading-[38px] text-[#000000] m-0">
                {t.welcomeBack}
              </h2>
              <h2 className="font-semibold text-[30px] leading-[38px] text-[#F15A22] m-0">
                {userName}
              </h2>
            </div>
            <p className="font-normal italic text-[14px] leading-[18px] tracking-[0.02em] text-[#666666] m-0">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-start gap-[16px] w-[300px]">
            {/* Continue Learning Button */}
            <button
              onClick={onContinueLearning}
              className="box-border flex flex-row justify-center items-center px-[10px] gap-[10px] w-[300px] h-[46px] border border-[#F15A22] bg-white hover:bg-[#FFF4EA] rounded-[10px] transition-all cursor-pointer"
            >
              <span className="font-medium text-[16px] leading-[20px] capitalize text-[#F15A22]">
                {t.continueLearning}
              </span>
            </button>

            {/* View Calendar Button */}
            <button
              onClick={handleViewCalendar}
              className="box-border flex flex-row justify-center items-center px-[10px] gap-[10px] w-[300px] h-[46px] border border-[#EDEDED] bg-white hover:bg-[#F9F9F9] rounded-[10px] transition-all cursor-pointer"
            >
              <span className="font-medium text-[16px] leading-[20px] text-[#2D2D2D]">
                {t.viewCalendar}
              </span>

              {/* Calendar Icon */}
              <div className="relative w-[22px] h-[22px]">
                <svg viewBox="0 0 22 22" fill="none" className="w-full h-full">
                  <rect
                    x="3"
                    y="4"
                    width="16"
                    height="15"
                    rx="2"
                    stroke="#2D2D2D"
                    strokeWidth="1.33333"
                  />
                  <path d="M3 9H19" stroke="#2D2D2D" strokeWidth="1.33333" />
                  <path
                    d="M7 2V5"
                    stroke="#2D2D2D"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 2V5"
                    stroke="#2D2D2D"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}