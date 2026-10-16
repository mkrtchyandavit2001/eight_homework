import { OTHER_PACKAGES } from "@/data/coursedetail";
import type { CourseDetailDictionary } from "@/types/course";
import Image from "next/image";

export function OtherPackages({ t }: { t: CourseDetailDictionary }) {
  return (
    <section className="px-2.5 py-10">
      <h3 className="text-[17px] font-semibold leading-[26px] text-[#2D2D2D]">
        {t.other.heading}
      </h3>

      <ul className="flex flex-col gap-4 pt-5">
        {OTHER_PACKAGES.map((pkg) => {
          const text = t.other.packages[pkg.id];
          return (
            <li
              key={pkg.id}
              className="flex gap-4 rounded-[18px] border border-[#EDEDED] bg-white p-4"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[#F4F4F4]">
                <Image src={pkg.image} alt={text.title} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[10px] font-medium uppercase leading-[15px] tracking-[0.25px] text-[#F15A22]">
                  {text.tag}
                </span>
                <span className="text-sm font-medium leading-[150%] text-[#2D2D2D]">{text.title}</span>
                <span className="text-sm font-medium leading-[21px] text-[#F15A22]">${pkg.price}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}