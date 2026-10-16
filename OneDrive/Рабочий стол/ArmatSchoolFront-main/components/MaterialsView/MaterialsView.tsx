"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MATERIALS } from "@/data/dashboardMaterials";
import type { MaterialItem, MaterialText } from "@/types/dashboard";
import DashTopbar from "../DashTopbar/DashTopbar";
import { DashDownloadIcon } from "../icons/Icons";
import MaterialCard from "../MaterialCard/MaterialCard";

export default function MaterialsView() {
  const { dict } = useLanguage();
  const t = dict.dashboard.materials;
  const texts = t.items as MaterialText[];

  const items: MaterialItem[] = useMemo(
    () =>
      MATERIALS.map((m) => ({
        ...m,
        ...(texts.find((x) => x.id === m.id) as MaterialText),
      })),
    [texts]
  );

  return (
    <div className="flex min-w-0 flex-1 flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <DashTopbar title={t.title} />

      <div className="flex flex-col items-end gap-4 p-5">
        <button
          type="button"
          // TODO: գրքի ներբեռնում backend-ից
          className="flex h-[34px] w-[220px] items-center justify-center gap-1.5 rounded-lg border border-solid border-[#F15A22] text-xs font-medium leading-[18px] text-[#F15A22] hover:bg-[#F15A22]/10"
        >
          <DashDownloadIcon size={14} />
          {t.downloadBook}
        </button>

        <div className="grid w-full gap-4 md:grid-cols-2">
          {items.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}