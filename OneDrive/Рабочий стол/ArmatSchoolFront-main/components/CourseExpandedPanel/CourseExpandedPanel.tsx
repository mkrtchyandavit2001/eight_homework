import type { CoursesDict } from "@/types/dashboard";

interface CourseExpandedPanelProps {
  id: string;
  about: string;
  teacher: string;
  schedule: string;
  t: CoursesDict;
}

const labelCls = "text-[11px] font-semibold uppercase leading-4 tracking-[0.55px] text-[#999]";

export default function CourseExpandedPanel({
  id,
  about,
  teacher,
  schedule,
  t,
}: CourseExpandedPanelProps) {
  return (
    <div
      id={`course-panel-${id}`}
      className="flex items-start gap-[30px] border-t border-[#EDEDED] pt-4 pb-4 max-md:flex-col max-md:gap-4"
    >
      <div className="min-w-0 flex-1">
        <p className={labelCls}>{t.aboutCourse}</p>
        <p className="text-[13px] leading-[21px] text-[#555]">{about}</p>
      </div>

      <div className="flex w-[211px] shrink-0 flex-col gap-2.5 max-md:w-full">
        <div>
          <p className={labelCls}>{t.teacher}</p>
          <p className="text-[13px] font-medium leading-5 text-[#2D2D2D]">{teacher}</p>
        </div>
        <div>
          <p className={labelCls}>{t.schedule}</p>
          <p className="text-[13px] leading-5 text-[#555]">{schedule}</p>
        </div>
      </div>
    </div>
  );
}
