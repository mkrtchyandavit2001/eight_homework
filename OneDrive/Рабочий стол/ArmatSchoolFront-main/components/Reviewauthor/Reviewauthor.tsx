import type { ReviewAuthorProps } from "@/types/types";

const getInitials = (name: string) =>
  name
    .replace(/\./g, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function ReviewAuthor({ name, location, flag }: ReviewAuthorProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-500 text-sm font-semibold leading-[21px] text-white"
      >
        {getInitials(name)}
      </div>
      <div>
        <p className="text-sm font-semibold leading-[21px] text-ink">{name}</p>
        <p className="text-xs leading-[18px] text-subtle">
          {flag} {location}
        </p>
      </div>
    </div>
  );
}