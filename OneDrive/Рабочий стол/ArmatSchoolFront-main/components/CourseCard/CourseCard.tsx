import Image from 'next/image';
import type { CourseCardProps } from '@/types/types';
import CourseMeta from '../CourseMeta/CourseMeta';
import CoursePrice from '../CoursePrice/CoursePrice';



export default function CourseCard({
  image,
  title,
  description,
  lessons,
  level,
  format,
  price,
  oldPrice,
  href,
  ctaLabel = 'View Course',
}: CourseCardProps) {
  return (
    <article className="box-border flex w-full  flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_22.2px_rgba(0,0,0,0.15)]">
      <div className="relative h-[170px] flex-none bg-line">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 720px) 100vw, 316px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="m-0 text-[22px] font-semibold leading-[30px] tracking-[-0.5px] text-ink">
          {title}
        </h3>

        {/* <div className="mt-0.5 border-b border-line "> */}
          <p className="m-0 line-clamp-2 text-sm py-2.5 leading-[150%] text-ink">{description}</p>
        {/* </div> */}

        <CourseMeta lessons={lessons} level={level} format={format} />

        <CoursePrice price={price} oldPrice={oldPrice} ctaLabel={ctaLabel} href={href} />
      </div>
    </article>
  );
}