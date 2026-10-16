import { buildCourseFacts } from "@/lib/course-facts";
import type { CourseDetailData, CourseDetailDictionary } from "@/types/course";

interface Props {
  t: CourseDetailDictionary;
  data: CourseDetailData;
  level: string;
  format: string;
  totalLessons: number;
}

export function InfoTiles({ t, data, level, format, totalLessons }: Props) {
  const f = buildCourseFacts(t, data, level, format, totalLessons);

  // Figma-ի հերթականությունը՝ 2 տող × 4 սյունակ
  const tiles = [
    f.lessonDuration, f.courseDuration, f.lessonsPerWeek, f.totalLessons,
    f.level, f.language, f.lessonFormat, f.certificate,
  ];

  return (
    <section className="px-0 pt-0 lg:px-[26px]">
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="flex min-h-[71px] flex-col justify-between gap-1.5 rounded-[14px] border border-[#EDEDED] bg-white p-[15px]"
          >
            <dt className="text-[11px] leading-[15px] text-[#999999]">{tile.label}</dt>
            <dd className="text-[13px] font-semibold leading-[18px] text-[#2D2D2D]">
              {tile.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}