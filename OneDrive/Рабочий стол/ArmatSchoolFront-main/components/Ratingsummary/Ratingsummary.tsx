import type { RatingSummaryProps } from "@/types/types";
import StarRow from "../Starrow/Starrow";

export default function RatingSummary({ average, count, countLabel }: RatingSummaryProps) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <StarRow rating={average} size={16} />
      <span className="text-xl  font-semibold leading-[30px] text-ink">{average.toFixed(1)}</span>
      <span className="text-sm leading-[21px] text-muted">
        ({count} {countLabel})
      </span>
    </div>
  );
}