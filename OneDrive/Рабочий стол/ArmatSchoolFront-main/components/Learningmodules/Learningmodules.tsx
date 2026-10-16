import { interpolate } from "@/lib/format";
import type { CourseDetailData, CourseDetailDictionary, ModuleText } from "@/types/course";


interface Props {
  t: CourseDetailDictionary;
  data: CourseDetailData;
  modules: ModuleText[];
}

export function LearningModules({ t, data, modules }: Props) {
  return (
    <section className="pt-[26px]">
      <h2 className="text-[26px] font-semibold leading-[39px] text-[#2D2D2D]">
        {t.learn.heading}
      </h2>

      <ol className="flex flex-col gap-3 pt-6">
        {modules.map((m, i) => {
          const lessons = data.moduleLessons[i] ?? 1;
          const meta = interpolate(
            lessons === 1 ? t.learn.metaOne : t.learn.metaOther,
            { lessons, hours: lessons * data.lessonDurationHours }
          );

          return (
            <li
              key={m.title}
              className="flex items-start gap-4 rounded-2xl border border-[#EDEDED] bg-white px-[21px] py-[17px]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[22px] bg-[#FFF3EE] text-xs font-semibold text-[#F15A22]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold leading-5 text-[#F15A22]">{m.title}</h3>
                <p className="text-sm leading-[25px] text-[#999999]">{m.description}</p>
                <p className="pt-1 text-[11px] leading-4 text-[#999999]">{meta}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}