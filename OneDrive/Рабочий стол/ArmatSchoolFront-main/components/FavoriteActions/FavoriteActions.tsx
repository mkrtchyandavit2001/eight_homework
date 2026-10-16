"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DashHeartIcon, ShareIcon } from "../icons/Icons";
import ShareMenu from "../ShareMenu/ShareMenu";

interface FavoriteActionsProps {
  title: string;
  /** Լրիվ path՝ locale-ով */
  href: string;
  onRemove: () => void;
}

export default function FavoriteActions({
  onRemove,
}: FavoriteActionsProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.profile.favorites;

  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Փակել մենյուն դրսում սեղմելիս
  useEffect(() => {
    if (!shareOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareOpen]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={t.removeAria}
        onClick={onRemove}
        className="flex h-[27px] w-4 items-center justify-center text-[#F15A22]"
      >
        <DashHeartIcon size={16} filled />
      </button>

      <div ref={shareRef} className="relative">
        <button
          type="button"
          onClick={() => setShareOpen((v) => !v)}
          aria-label={t.shareAria}
          aria-expanded={shareOpen}
          className="rounded p-1.5"
        >
          <ShareIcon className="h-[15px] w-[15px]" />
        </button>

        {shareOpen && (
          <div className="absolute right-0 bottom-7 z-50 mt-2">
            <ShareMenu />
          </div>
        )}
      </div>
    </div>
  );
}