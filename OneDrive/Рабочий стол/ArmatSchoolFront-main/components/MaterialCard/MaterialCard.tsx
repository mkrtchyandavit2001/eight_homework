"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { fillTemplate } from "@/lib/homework";
import type { MaterialItem } from "@/types/dashboard";
import { DashEyeIcon, DashPenIcon, DashVideoIcon } from "../icons/Icons";

interface ActionLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  highlighted: boolean;
  className?: string;
}

function ActionLink({ href, icon, label, highlighted, className = "" }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-[34px] items-center justify-center gap-1.5 rounded-lg border border-solid text-xs font-medium leading-[18px] transition-colors ${
        highlighted
          ? "border-[#F15A22] text-[#F15A22] hover:bg-[#F15A22]/10"
          : "border-[#EDEDED] text-[#666] hover:border-[#F15A22] hover:text-[#F15A22]"
      } ${className}`}
    >
      <span className="text-[#F15A22]">{icon}</span>
      {label}
    </a>
  );
}

interface MaterialCardProps {
  item: MaterialItem;
}

export default function MaterialCard({ item }: MaterialCardProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.materials;
  const highlighted = Boolean(item.highlighted);

  const meta = [
    item.teacher,
    fillTemplate(t.unit, { n: item.unit }),
    `${item.size.value} ${t.units[item.size.unit]}`,
  ].join(" · ");

  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border-[0.67px] border-solid bg-white p-5 ${
        highlighted ? "border-[#F15A22]" : "border-[#EDEDED]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <h3
            className={`text-sm font-semibold leading-[21px] ${
              highlighted ? "text-[#F15A22]" : "text-[#2D2D2D]"
            }`}
          >
            {item.title}
          </h3>
          <p className="text-[11px] leading-4 text-[#AAA]">{meta}</p>
        </div>

        {/* Առաջին քարտում Watch-ը վերևում է՝ լրիվ պիտակով */}
        {highlighted && item.videoUrl && (
          <ActionLink
            href={item.videoUrl}
            icon={<DashVideoIcon size={16} />}
            label={t.watch}
            highlighted
            className="shrink-0 px-4"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <ActionLink
          href={item.viewUrl}
          icon={<DashEyeIcon size={16} />}
          label={t.view}
          highlighted={highlighted}
          className="flex-1"
        />
        {!highlighted && item.videoUrl && (
          <ActionLink
            href={item.videoUrl}
            icon={<DashVideoIcon size={16} />}
            label={t.watch}
            highlighted={false}
            className="flex-1"
          />
        )}
        {item.exerciseUrl && (
          <ActionLink
            href={item.exerciseUrl}
            icon={<DashPenIcon size={16} />}
            label={t.letsDo}
            highlighted={highlighted}
            className="flex-1"
          />
        )}
      </div>
    </article>
  );
}