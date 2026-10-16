"use client";

import { useState } from "react";
import type { ArticleSection, ArticleSidebarProps, ArticleTag } from "@/types/types";



export default function ArticleSidebar({
  sections,
  tags,
  contentsLabel,
  tagsLabel,
}: ArticleSidebarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  const handleClick = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="w-[240px] shrink-0 max-lg:w-full">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[#999999]">
          {contentsLabel}
        </p>
        <nav className="mt-4 flex flex-col gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-[13px] font-medium transition-colors ${
                activeId === section.id
                  ? "bg-[#F15A22]/5 font-semibold text-[#F15A22]"
                  : "text-[#666666] hover:bg-[#F4F4F4]"
              }`}
            >
              {section.heading}
            </button>
          ))}
        </nav>
      </div>

      {tags.length > 0 && (
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[#999999]">
            {tagsLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-[#F4F4F4] px-3 py-1.5 text-[11px] text-[#666666]"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}