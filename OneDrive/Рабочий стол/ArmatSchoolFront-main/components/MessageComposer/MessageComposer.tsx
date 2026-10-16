"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DashCloseIcon, DashPaperclipIcon, DashSendIcon } from "../icons/Icons";

const EMOJIS = ["😊", "😀", "👍", "🙏", "❤️", "🎉", "👏", "🇦🇲"];

interface MessageComposerProps {
  onSend: (text: string, attachments: string[]) => void;
}

export default function MessageComposer({ onSend }: MessageComposerProps) {
  const { dict } = useLanguage();
  const t = dict.dashboard.messages.composer;

  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const canSend = text.trim().length > 0 || files.length > 0;

  const send = () => {
    if (!canSend) return;
    // TODO: ֆայլերը ուղարկել backend (այժմ՝ միայն անունները)
    onSend(text.trim(), files.map((f) => f.name));
    setText("");
    setFiles([]);
    setEmojiOpen(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border-t border-solid border-[#EDEDED] p-4">
      {files.length > 0 && (
        <ul className="flex flex-wrap gap-2 pb-3">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 rounded-lg bg-[#F7F7F7] px-3 py-1.5 text-xs text-[#666]"
            >
              <span className="max-w-[200px] truncate">{file.name}</span>
              <button
                type="button"
                aria-label={t.removeAttachment}
                onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-[#999] hover:text-[#F15A22]"
              >
                <DashCloseIcon size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative flex items-end gap-3">
        <button
          type="button"
          aria-label={t.attachAria}
          onClick={() => fileRef.current?.click()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-solid border-[#EDEDED] text-[#666] hover:bg-[#F7F7F7]"
        >
          <DashPaperclipIcon size={16} />
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
            e.target.value = "";
          }}
        />

        <div className="flex flex-1 items-center rounded-xl border border-solid border-[#EDEDED] focus-within:border-[#F15A22]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder={t.placeholder}
            className="max-h-[120px] min-h-10 flex-1 resize-none bg-transparent px-4 py-2.5 text-[13px] leading-5 text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]/50"
          />
          <button
            type="button"
            aria-label={t.emojiAria}
            aria-expanded={emojiOpen}
            onClick={() => setEmojiOpen((o) => !o)}
            className="flex h-8 w-10 items-center justify-center pr-2 text-lg text-[#AAA]"
          >
            😊
          </button>
        </div>

        <button
          type="button"
          aria-label={t.sendAria}
          onClick={send}
          disabled={!canSend}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F15A22] text-white disabled:opacity-40"
        >
          <DashSendIcon size={16} className="!text-white" />
        </button>

        {emojiOpen && (
          <div className="absolute bottom-12 right-[60px] flex gap-1 rounded-xl border border-solid border-[#EDEDED] bg-white p-2 shadow-lg">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setText((prev) => prev + emoji)}
                className="h-8 w-8 rounded-lg text-lg hover:bg-[#F7F7F7]"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}