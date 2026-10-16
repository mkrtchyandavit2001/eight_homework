'use client';

import { useLanguage } from "@/context/LanguageContext";
import { BookIcon, BookOpenIcon, LevelIcon, LevelOutlineIcon, MonitorIcon } from "../icons/Icons";

interface CourseMetaProps {
  lessons: number | string;
  level: string;
  format: string;
}

function Separator() {
  return <span aria-hidden="true" className="h-[18px] w-px flex-none self-center bg-line" />;
}

const itemClass =
  'flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap text-[10px] leading-[150%] text-black';

export default function CourseMeta({ lessons, level, format }: CourseMetaProps) {
  const { dict } = useLanguage();

  return (
    <div className="flex items-start gap-0.5 pb-2.5 pt-5">
      <div className={itemClass}>
        <BookOpenIcon className="text-orange-500" />
        <span>{lessons} {dict.courseMeta.lessons}</span>
      </div>
      <Separator />
      <div className={itemClass}>
        <LevelOutlineIcon />
        <span>{level}</span>
      </div>
      <Separator />
      <div className={itemClass}>
        <MonitorIcon />
        <span>{format}</span>
      </div>
    </div>
  );
}