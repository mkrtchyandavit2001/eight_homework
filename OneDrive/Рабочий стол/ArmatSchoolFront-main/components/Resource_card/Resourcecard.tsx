import Image from "next/image";
import Link from "next/link";
import type { ResourceCardProps } from "@/types/types";


export default function ResourceCard({ item, href, ctaLabel }: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#EDEDED] bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative h-[180px] w-full flex-none bg-[#F5F5F5]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 390px"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 rounded-lg border border-[#EDEDED] bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase leading-[15px] tracking-[0.5px] text-[#F15A22] backdrop-blur-sm">
          {item.format ?? "PDF"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] leading-4">
          <span className="font-semibold uppercase tracking-[0.6px] text-[#F15A22]">{item.category}</span>
          <span className="text-[#DDD]">·</span>
          <span className="text-[#999]">{item.level}</span>
          <span className="text-[#DDD]">·</span>
          <span className="text-[#999]">{item.age}</span>
        </div>

        <h3 className="pt-3 text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">{item.title}</h3>
        <p className="flex-1 pt-2 text-[13px] leading-5 text-[#666]">{item.description}</p>

        
      </div>
    </Link>
  );
}