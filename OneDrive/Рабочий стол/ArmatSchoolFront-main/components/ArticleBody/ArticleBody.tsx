import type { ArticleBodyProps, ArticleSection } from "@/types/types";



export default function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <div className="flex-1">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index > 0 ? "mt-10 scroll-mt-24" : "scroll-mt-24"}
        >
          <h2 className="text-[22px] font-semibold leading-[145%] text-[#2D2D2D]">
            {section.heading}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-[150%] text-[#444444]">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}