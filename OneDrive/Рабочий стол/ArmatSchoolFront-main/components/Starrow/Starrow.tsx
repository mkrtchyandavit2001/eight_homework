import type { StarRowProps } from "@/types/types";
import { StarIcon } from "../icons/Icons";

export default function StarRow({ rating, size = 14, max = 5 }: StarRowProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} / ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} size={size} filled={i < Math.round(rating)} />
      ))}
    </div>
  );
}