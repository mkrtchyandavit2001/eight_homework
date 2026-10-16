"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  { src: "/images/authentic-armenia.png", alt: "Authentic Armenia" },
  { src: "/images/armenian-language-game-for-children.jpg", alt: "Armenian language game for children" },
  { src: "/images/past-community.jpg", alt: "Armat community" },
  { src: "/images/groupLarge-lessons.jpg", alt: "Group lessons" },
];

const SLIDE_INTERVAL = 4000;

export function Hero() {
  const { dict } = useLanguage();
  const t = dict.about.hero;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="border-b border-gray-300 py-10">
      <div className="mx-auto w-full">
        <div className="flex items-center gap-2 pb-5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F15A22]" />
          <span className="text-[11px] font-semibold uppercase leading-4 tracking-[1.1px] text-[#F15A22]">
            {t.label}
          </span>
        </div>

        <div className="flex flex-col items-start lg:flex-row">
          <div className="flex flex-1 flex-col pt-5">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-2.5px] text-[#2D2D2D] md:text-[72px] md:leading-[76px]">
              {t.title}
            </h1>
            <p className="max-w-[600px] pt-6 text-lg leading-[30px] text-[#666666]">
              {t.description}
            </p>
          </div>

          <div className="flex w-full flex-col items-center pt-10 lg:w-[532px] lg:shrink-0 lg:pt-0">
            <div className="relative h-[312px] w-full overflow-hidden bg-[#D9D9D9]">
              {slides.map((slide, index) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 532px, 100vw"
                  priority={index === 0}
                  className={`object-cover object-center transition-opacity duration-700 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2 pt-2.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Slide ${index + 1}`}
                  aria-current={index === current}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-6 bg-[#F15A22]"
                      : "w-2 bg-[#EDEDED] hover:bg-[#D9D9D9]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}