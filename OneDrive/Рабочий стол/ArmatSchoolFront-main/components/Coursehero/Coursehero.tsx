import type { CourseDetailData, CourseDetailDictionary, TeacherDict } from "@/types/course";
import Image from "next/image";
import { interpolate } from "@/lib/format";
import { CertificateIcon, CheckIcon, UsersIcon } from "../icons/Icons";

interface Props {
  t: CourseDetailDictionary;
  data: CourseDetailData;
  title: string;
  subtitle: string;
  description: string;
  teacher: TeacherDict;
}

export function CourseHero({ t, data, title, subtitle, description, teacher }: Props) {
  return (
    <section className="px-0 lg:px-[26px]">
      <div className="relative h-[280px] w-full overflow-hidden rounded-[20px]">
        <Image
          src={data.heroImage}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 758px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-md bg-[#F15A22] px-2.5 py-[5px]">
          <span className="size-1.5 rounded-full bg-white/70" />
          <span className="text-[10px] font-semibold uppercase leading-[10px] tracking-[1px] text-white">
            {t.badge}
          </span>
        </div>
      </div>

      <div className="pt-7">
        <p className="pb-4 text-[13px] font-medium uppercase leading-4 tracking-[1.1px] text-[#F15A22]">
          {t.category}
        </p>
        <h1 className="pb-2.5 text-[32px] font-medium leading-[40px] tracking-[-0.8px] text-[#2D2D2D] md:text-[42px] md:leading-[50px]">
          {title}
        </h1>
        <p className="pb-3.5 text-[17px] font-medium leading-6 text-[#2D2D2D]">{subtitle}</p>
        <p className="pb-5 text-[15px] leading-[25px] text-[#555555]">{description}</p>

        <div className="flex items-center gap-1.5 pb-5">
          <UsersIcon size={14} className="text-[#999999]" />
          <span className="text-[13px] leading-[13px] text-[#666666]">
            {interpolate(t.studentsEnrolled, { count: data.studentsEnrolled })}
          </span>
        </div>

        <ul className="flex flex-wrap gap-y-2.5 pb-7">
          {data.features.map((key) => (
            <li
              key={key}
              className="flex items-center gap-1.5 border-l border-[#EDEDED] px-3 py-[7px]"
            >
              <span className="flex size-4 items-center justify-center rounded-full bg-[#FFF3EE]">
                <CheckIcon size={8} className="text-[#F15A22]" />
              </span>
              <span className="text-xs leading-3 text-[#444444]">{t.features[key]}</span>
            </li>
          ))}
        </ul>

        {/* Instructor */}
        <div className="flex flex-wrap items-center gap-3 rounded-[14px] border border-[#EDEDED] bg-white p-3.5">
          <Image
            src={teacher.image}
            alt={teacher.name}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
          <Stat label={t.instructor.label} value={teacher.name} />
          <Divider />
          <Stat label={t.instructor.experienceLabel} value={teacher.experience} />
          <Divider />
          <Stat label={t.instructor.languageLabel} value={t.instructor.languageValue} />
          <div className="hidden flex-1 md:block" />
          <div className="flex items-center gap-1">
            <span className="p-1">
              <CertificateIcon size={11} className="text-[#F15A22]" />
            </span>
            <span className="text-xs font-semibold leading-3 text-[#F15A22]">
              {t.instructor.certified}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs leading-[18px] text-[#999999]">{label}</span>
      <span className="text-sm font-medium leading-[21px] text-[#2D2D2D]">{value}</span>
    </div>
  );
}

function Divider() {
  return <span className="mx-1 hidden h-9 w-px bg-[#EDEDED] sm:block" />;
}