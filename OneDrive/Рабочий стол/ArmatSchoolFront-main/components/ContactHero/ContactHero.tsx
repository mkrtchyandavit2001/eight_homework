// components/contact/ContactHero.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext"; // ձեր provider-ի ճանապարհը
import type { ContactPageDictionary } from "@/types/contact";

export default function ContactHero() {
  const { dict } = useLanguage();
  const t = dict.contactPage as ContactPageDictionary;

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] bg-[#F15A22] rounded-full" />
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-[16px] tracking-[1.1px] uppercase text-[#F15A22]">
          {t.label}
        </span>
      </div>

      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[52px] sm:leading-[78px]">
        {t.title}
      </h1>

      <p className="max-w-[400px] text-[#666666] pt-4 text-lg leading-[27px] text-muted">
        {t.subtitle}
      </p>
    </div>
  );
}
