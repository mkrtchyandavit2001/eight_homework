"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import type { ReviewFormData, WriteReviewModalProps } from "@/types/types";
import { StarIcon } from "../icons/Icons";

const initial: ReviewFormData = {
  rating: 0,
  firstName: "",
  lastName: "",
  location: "",
  review: "",
};

const labelCls =
  "block pb-2 text-[13px] font-semibold leading-5 text-[#2D2D2D]";
const inputCls =
  "box-border h-[43px] w-full rounded-lg border border-[#EDEDED] bg-[#F7F7F7] px-4 text-[14px] leading-[18px] text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50 focus:border-[#F15A22]";

/* ---------- Modal ---------- */

export default function WriteReviewModal({
  open,
  onClose,
  onSubmit,
}: WriteReviewModalProps) {
  const { dict } = useLanguage();
  // writeReviewModal is nested inside reviewsPage in the dictionary
  const t = dict.reviewsPage.writeReviewModal;
  const [form, setForm] = useState<ReviewFormData>(initial);
  const [hover, setHover] = useState(0);

  // Esc + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const set = <K extends keyof ReviewFormData>(k: K, v: ReviewFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleClose = () => {
    setForm(initial);
    setHover(0);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rating || !form.firstName.trim() || !form.review.trim()) return;
    onSubmit?.(form);
    handleClose();
  };

  const starAria = (n: number) =>
    (n === 1 ? t.starAriaOne : t.starAriaOther).replace("{count}", String(n));

  const active = hover || form.rating;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
    >
      <div className="m-auto box-border flex max-h-full w-full max-w-[560px] flex-col items-start overflow-y-auto rounded-[24px] bg-white p-6 font-jakarta shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[640px] sm:p-10">
        {/* Header */}
        <div className="flex w-full items-center justify-between self-stretch">
          <div className="flex flex-col">
            <h2
              id="write-review-title"
              className="text-[22px] font-semibold leading-[33px] text-[#2D2D2D]"
            >
              {t.title}
            </h2>
            <p className="pt-1 text-[14px] font-normal leading-[21px] text-[#666666]">
              {t.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={t.closeAria}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[18px] leading-7 text-[#999999] transition-colors hover:bg-[#F7F7F7]"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start gap-5 pt-6"
        >
          {/* Rating */}
          <div className="flex w-full flex-col">
            <span className="block text-[13px] font-semibold leading-5 text-[#2D2D2D]">
              {t.rating}
            </span>
            <div
              className="flex h-9 gap-1 pt-2"
              onMouseLeave={() => setHover(0)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={starAria(n)}
                  onMouseEnter={() => setHover(n)}
                  onClick={() => set("rating", n)}
                  className="flex h-7 w-7 items-center justify-center"
                >
                  <StarIcon
                    className={`transition-opacity ${
                      n <= active ? "opacity-100" : "opacity-20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Names */}
          <div className="flex w-full gap-4">
            <div className="flex min-w-0 flex-1 flex-col">
              <label className={labelCls} htmlFor="rv-first">
                {t.firstName}
              </label>
              <input
                id="rv-first"
                required
                className={inputCls}
                placeholder={t.firstNamePlaceholder}
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <label className={labelCls} htmlFor="rv-last">
                {t.lastName}
              </label>
              <input
                id="rv-last"
                className={inputCls}
                placeholder={t.lastNamePlaceholder}
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex w-full flex-col">
            <label className={labelCls} htmlFor="rv-loc">
              {t.location}
            </label>
            <input
              id="rv-loc"
              className={inputCls}
              placeholder={t.locationPlaceholder}
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </div>

          {/* Review */}
          <div className="flex w-full flex-col">
            <label className={labelCls} htmlFor="rv-text">
              {t.review}
            </label>
            <div className="h-[117px] w-full">
              <textarea
                id="rv-text"
                required
                className="box-border h-[110px] w-full resize-none rounded-lg border border-[#EDEDED] bg-[#F7F7F7] px-4 py-3 text-[14px] leading-[21px] text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50 focus:border-[#F15A22]"
                placeholder={t.reviewPlaceholder}
                value={form.review}
                onChange={(e) => set("review", e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="box-border flex h-[47px] flex-1 items-center justify-center rounded-lg border border-[#EDEDED] text-[14px] font-medium leading-[21px] text-[#666666] transition-colors hover:bg-[#F7F7F7]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!form.rating}
              className="flex h-[47px] flex-1 items-center justify-center rounded-lg bg-[#F15A22] text-[14px] font-semibold leading-5 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}