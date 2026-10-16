'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PurchasedItem, PurchaseSuccessModalProps } from '@/types/types';

const DEFAULT_ITEM: PurchasedItem = {
  title: 'Armenian Writing Practice Workbook',
  meta: 'PDF · 52 Pages',
  image: '/images/workbook.jpg',
};

export default function PurchaseSuccessModal({
  isOpen,
  onClose,
  item = DEFAULT_ITEM,
  openHref = '#',
  myResourcesHref = '/my-resources',
}: PurchaseSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/40 p-4 font-jakarta lg:px-20 lg:py-[10px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-success-title"
        className="relative flex w-full max-w-[1120px] items-center justify-center rounded-[22px] bg-white p-4 sm:px-10 lg:px-20 lg:py-5"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#999] transition-colors hover:bg-[#F7F7F7] hover:text-[#2D2D2D]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex w-full max-w-[560px] flex-col items-center rounded-[22px] border border-[#EDEDED] px-5 py-5 sm:px-10">
          {/* Heading */}
          <div className="flex flex-col items-center pt-4 text-center">
            <h1
              id="purchase-success-title"
              className="text-[28px] font-semibold leading-[150%] text-[#2D2D2D]"
            >
              Purchase Successful!
            </h1>
            <p className="text-[15px] leading-[150%] text-[#666]">
              Your learning resource is now available.
            </p>
          </div>

          {/* Purchased item */}
          <div className="w-full pt-5">
            <div className="flex items-center gap-4 rounded-[22px] border border-[#EDEDED] bg-white p-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#F7F7F7]">
                <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-[21px] text-[#2D2D2D]">{item.title}</p>
                <p className="text-xs leading-[18px] text-[#999]">{item.meta}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 pt-6 sm:flex-row">
            <Link
              href={openHref}
              className="flex flex-1 items-center justify-center rounded-xl border border-primary py-[14px] text-sm font-semibold leading-[21px] text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Open Resource
            </Link>
            <Link
              href={myResourcesHref}
              className="flex flex-1 items-center justify-center rounded-xl border border-[#EDEDED] py-[14px] text-sm font-semibold leading-[21px] text-[#2D2D2D] transition-colors hover:bg-[#F7F7F7]"
            >
              Go to My Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}