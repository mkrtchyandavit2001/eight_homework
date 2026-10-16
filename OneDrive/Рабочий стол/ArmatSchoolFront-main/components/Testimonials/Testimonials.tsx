"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon, StarIcon } from "../icons/Icons";

interface TestimonialItem {
  quote: string;
  name: string;
  location: string;
  initials: string;
}

export function Testimonials() {
  const { dict } = useLanguage();
  const t = dict.testimonials;
  const items = Object.values(t.items) as TestimonialItem[];

  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 self-start">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[11px] font-semibold text-orange-500 uppercase leading-4 tracking-[1.1px] text-primary">
              {t.sectionLabel}
            </span>
          </div>
          <h2 className="pt-4 text-4xl font-semibold tracking-[-1.3px] text-[#2D2D2D] md:text-[52px] md:leading-[65px]">
            {t.heading}
          </h2>
        </div>

        <div className="flex text-orange-500 justify-end pt-5">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-[15px] font-semibold leading-[22px] text-primary transition-colors hover:text-primary/80"
          >
            {t.readMore}
            <ArrowRightIcon className="h-[15px] w-[15px]" />
          </button>
        </div>

        <div className="grid gap-8 pt-5 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col gap-5 rounded-3xl border border-[#EDEDED] bg-white p-8"
            >
              <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5 text-orange-500" />
                ))}
              </div>
              <blockquote className="flex-1 text-base leading-[26px] text-[#2D2D2D]">
                “{item.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-[#EDEDED] pt-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold leading-5 text-white">
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-[21px] text-[#2D2D2D]">{item.name}</p>
                  <p className="text-xs leading-[18px] text-[#999999]">{item.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}