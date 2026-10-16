'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface CoursePriceProps {
  price: number | string;
  oldPrice?: number | string;
  ctaLabel?: string;
  href: string; // օր. "/courses/beginner"
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#F15A22"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function CoursePrice({ price, oldPrice, href }: CoursePriceProps) {
  const { dict, locale } = useLanguage();

  return (
    <div className="mt-auto flex items-start text-orange-500 justify-between gap-4 pt-4">
      <div className="flex h-10 items-end gap-[5px]">
        <span className="text-[26px] font-semibold leading-[150%] text-primary">{price}</span>
        {oldPrice != null && (
          <span className="text-[13px] my-auto leading-[150%] text-[#BBBBBB] line-through">
            {oldPrice}
          </span>
        )}
      </div>

      {/* locale prefix՝ /hy/courses/beginner */}
      <Link
        href={`/${locale}${href}`}
        className="flex h-10 items-center justify-center gap-2 text-[13px] font-medium leading-5 text-primary"
      >
        {dict.home.courses.cta}
        <ArrowIcon />
      </Link>
    </div>
  );
}