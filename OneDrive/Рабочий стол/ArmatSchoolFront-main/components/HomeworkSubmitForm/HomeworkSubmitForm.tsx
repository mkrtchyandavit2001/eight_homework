"use client";

import { useRef, useState, type DragEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ACCEPT_ATTR, ACCEPTED_TYPES, MAX_FILE_BYTES, fillTemplate } from "@/lib/homework";
import type { HomeworkSubmission } from "@/types/dashboard";
import { DashCloseIcon, DashUploadIcon } from "../icons/Icons";

interface HomeworkSubmitFormProps {
  /** "Try Again" վիճակ՝ նարնջագույն եզրագծերով */
  retry?: boolean;
  onSubmit: (submission: HomeworkSubmission) => void;
}

export default function HomeworkSubmitForm({ retry = false, onSubmit }: HomeworkSubmitFormProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.homework;

  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (list: FileList | File[]) => {
    const accepted: File[] = [];
    let message: string | null = null;

    Array.from(list).forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        message = fillTemplate(t.fileBadType, { name: file.name });
      } else if (file.size > MAX_FILE_BYTES) {
        message = fillTemplate(t.fileTooBig, { name: file.name });
      } else {
        accepted.push(file);
      }
    });

    setError(message);
    if (accepted.length) setFiles((prev) => [...prev, ...accepted]);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const canSubmit = text.trim().length > 0 || files.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ text: text.trim(), files });
    setText("");
    setFiles([]);
  };

  const accent = retry ? "border-[#F15A22]" : "border-[#EDEDED]";

  return (
    <div className="flex flex-col pt-5">
      {/* Dropzone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-white p-6 ${accent} ${
          dragging ? "bg-[#FFF3EE]" : ""
        }`}
      >
        <DashUploadIcon size={24} className="text-[#AAA]" />
        <span className="text-[13px] font-medium leading-5 text-[#666]">{t.dropTitle}</span>
        <span className="text-[11px] leading-4 text-[#AAA]">{t.dropHint}</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_ATTR}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {error && (
        <p role="alert" className="pt-2 text-xs leading-[18px] text-[#F15A22]">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2 pt-3">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-solid border-[#EDEDED] bg-white px-3 py-2"
            >
              <span className="truncate text-xs leading-[18px] text-[#666]">{file.name}</span>
              <button
                type="button"
                aria-label={t.removeFile}
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="ml-3 shrink-0 text-[#999] hover:text-[#F15A22]"
              >
                <DashCloseIcon size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Response */}
      <div className={`mt-4 flex flex-col rounded-2xl border border-solid bg-white p-5 ${accent}`}>
        <label htmlFor="hw-response" className="pb-3 text-sm font-medium leading-[21px] text-[#2D2D2D]">
          {t.yourResponse}
        </label>
        <textarea
          id="hw-response"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.responsePlaceholder}
          rows={5}
          className="w-full resize-none rounded-[10px] border border-solid border-[#EDEDED] p-3 text-[13px] leading-5 text-[#2D2D2D] outline-none placeholder:text-[#CCC] focus:border-[#F15A22]"
        />
        <p className="pt-1 text-right text-[11px] leading-4 text-[#AAA]">
          {fillTemplate(t.characters, { count: text.length })}
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium leading-[21px] text-[#F15A22] hover:bg-[#F15A22]/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <DashUploadIcon size={14} />
          {t.submit}
        </button>
      </div>
    </div>
  );
}