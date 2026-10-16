  "use client";

  import { useLanguage } from "@/context/LanguageContext";
  import { CalendarIcon, ChartIcon, GlobeGrayIcon, GlobeIcon, GraduationCapIcon, UsersIcon, VideoIcon } from "../icons/Icons";


  export default function WhyArmat() {
    const { dict } = useLanguage();
    const t = dict.home.whyArmat;

    const features = [
      { key: "nativeTeachers", icon: <GraduationCapIcon /> },
      { key: "liveLessons", icon: <VideoIcon /> },
      { key: "flexibleSchedule", icon: <CalendarIcon /> },
      { key: "progressTracking", icon: <ChartIcon /> },
      { key: "culturalImmersion", icon: <GlobeIcon /> },
      { key: "globalCommunity", icon: <UsersIcon /> },
    ] as const;

    return (
      <section className="flex flex-col items-start w-full py-16 sm:py-20 ">
        <div className="flex flex-col items-center w-full mx-auto">
          {/* ===== Section label ===== */}
          <div className="flex flex-row items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-4 tracking-[1.1px] uppercase text-orange-500">
              {t.sectionLabel}
            </span>
          </div>

          {/* ===== Heading ===== */}
          <h2 className="w-full max-w-[600px] pt-4 font-['Plus_Jakarta_Sans'] from-neutral-500 text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.25] tracking-[-1.3px] text-center text-[#2D2D2D]">
            {t.heading}
          </h2>

          {/* ===== Subtitle ===== */}
          <p className="w-full max-w-[540px] pt-4 font-['Plus_Jakarta_Sans'] text-base sm:text-[17px] leading-[1.6] text-center text-[#666666]">
            {t.subtitle}
          </p>

          {/* ===== Feature cards ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-16">
            {features.map(({ key, icon }) => {
              const feature = t.features[key];
              return (
                <div
                  key={key}
                  className="box-border flex flex-col items-start p-8 bg-white border border-[#EDEDED] rounded-[22px]"
                >
                  <div className="flex flex-row justify-center items-center w-12 h-12  rounded-2xl shrink-0 text-[var(--orange-500)]">
                    {icon}
                  </div>
                  <h3 className="pt-6 font-['Plus_Jakarta_Sans'] font-semibold text-[17px] leading-[26px] text-[#2D2D2D]">
                    {feature.title}
                  </h3>
                  <p className="pt-3 font-['Plus_Jakarta_Sans'] text-sm leading-[23px] text-[#666666]">
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
