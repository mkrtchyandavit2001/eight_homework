import Link from "next/link";
import type { RelatedArticlesProps } from "@/types/types";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "../icons/Icons";

export default function RelatedArticles({
  title,
  items,
}: RelatedArticlesProps) {
  const { dict } = useLanguage();
  const t = dict.blog;

  if (items.length === 0) return null;

  return (
    <div className="mt-12 border-t border-[#EDEDED] pt-8">
      <h2 className="text-xl font-semibold text-[#2D2D2D]">{title}</h2>

      <div className="mt-6 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="flex flex-col overflow-hidden rounded-[22px] border border-[#EDEDED] bg-white"
          >
            <div
              className="h-[160px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label={item.title}
            />
            <div className="flex flex-col p-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#F15A22]">
                  {t.categories[item.category] ?? item.category}
                </span>
                <span className="text-[11px] text-[#BBBBBB]">{item.date}</span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-5 text-[#2D2D2D]">
                {item.title}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#F15A22]">
                {t.readMore}
                <ArrowRightIcon className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
