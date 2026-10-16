"use client";

import { useRef } from "react";
import { SettingsUploadIcon } from "../icons/Icons";
import { AVATAR_ACCEPT } from "@/data/settingsOptions";


interface AvatarUploaderProps {
  initial: string;
  previewUrl: string | null;
  title: string;
  hint: string;
  uploadLabel: string;
  error: string | null;
  onFile: (file: File) => void;
}

export default function AvatarUploader({
  initial,
  previewUrl,
  title,
  hint,
  uploadLabel,
  error,
  onFile,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-5 rounded-[18px] border border-[#EDEDED] bg-[#F7F7F7] p-5">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#F15A22] bg-[#F15A22]/5">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[24px] font-semibold leading-8 text-[#F15A22]">
            {initial}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="text-[14px] font-semibold leading-[21px] text-[#2D2D2D]">
          {title}
        </p>
        <p
          className={`pt-1 text-[12px] leading-[18px] ${
            error ? "text-[#E7000B]" : "text-[#999999]"
          }`}
        >
          {error ?? hint}
        </p>

        <div className="pt-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-[6px] rounded-[18px] border border-[#EDEDED] bg-white px-3 py-[6px] text-[12px] font-semibold leading-[18px] text-[#2D2D2D] transition-colors hover:border-[#F15A22] hover:text-[#F15A22]"
          >
            <SettingsUploadIcon size={11} />
            {uploadLabel}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={AVATAR_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
}
