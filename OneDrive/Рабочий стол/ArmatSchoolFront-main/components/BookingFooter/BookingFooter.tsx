import React from "react";
import type { BookingFooterProps } from "@/types/types";
import { BellIcon, GlobeIcon, LockIcon } from "../icons/Icons";



export default function BookingFooter({ t, year }: BookingFooterProps) {
  return (
    <>
      {/* Contact strip */}
      <div className="bg-white border border-gray-100 rounded-[16px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] px-[16px] py-[16px] flex items-center justify-between gap-[16px] flex-wrap">
        <div className="flex items-center gap-[10px]">
          <div className="w-[32px] h-[32px] rounded-[18px] flex items-center justify-center bg-orange-500/10">
            <BellIcon  />
          </div>
          <div>
            <p className="text-[14px] font-medium text-gray-800">{t.needDifferentTimeTitle ?? "Need a different time?"}</p>
            <p className="text-[12px] text-gray-400">{t.needDifferentTimeBody ?? "Can't find a slot that works? Reach us directly."}</p>
          </div>
        </div>
        <button type="button" className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-[18px] border border-gray-100 hover:bg-gray-25">
          <BellIcon />
          <span className="text-[12px] font-semibold text-gray-600">{t.emailUs ?? "Email Us"}</span>
        </button>
      </div>

      {/* Notice */}
      <div className="bg-white border border-gray-900/[0.07] rounded-[16px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] px-[16px] py-[16px] flex items-start gap-[12px]">
        <BellIcon />
        <p className="text-[14px] leading-[23px] text-gray-600">
          {t.confirmationNoticePrefix ?? "After selecting your appointment, you will automatically receive a "}
          <strong className="font-semibold">{t.confirmationEmail ?? "confirmation email"}</strong>
          {t.confirmationNoticeMiddle ?? " and a "}
          <strong className="font-semibold">{t.calendarInvitation ?? "calendar invitation"}</strong>
          {t.confirmationNoticeSuffix ?? " with your lesson link."}
        </p>
      </div>

      {/* Footer */}
      <footer className="pt-[48px]">
        <div className="border-t border-gray-900/[0.07] pt-[32px] flex flex-col items-center gap-[12px]">
          <p className="text-[14px] text-gray-400 text-center">
            {t.needHelpPrefix ?? "Need help? "}
            <a href={t.supportHref ?? "#"} className="font-semibold text-orange-500 hover:underline">
              {t.contactSupport ?? "Contact our support team"}
            </a>
            {t.needHelpSuffix ?? " — we respond within 2 hours."}
          </p>

          <div className="flex items-center justify-center gap-[20px] flex-wrap">
            <span className="flex items-center gap-[4px] text-[12px] text-gray-400">
              <LockIcon /> {t.sslSecured ?? "SSL Secured"}
            </span>
            <span className="text-gray-400">·</span>
            <span className="flex items-center gap-[4px] text-[12px] text-gray-400">
              <GlobeIcon /> {t.availableWorldwide ?? "Available Worldwide"}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-[12px] text-gray-400">{t.copyright ?? `© ${year} Armat`}</span>
          </div>
        </div>
      </footer>
    </>
  );
}