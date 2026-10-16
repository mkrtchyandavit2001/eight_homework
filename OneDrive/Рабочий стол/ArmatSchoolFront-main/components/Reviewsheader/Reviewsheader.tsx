import type { ReviewsHeaderProps } from "@/types/types";
import RatingSummary from "../Ratingsummary/Ratingsummary";

export default function ReviewsHeader({
  average,
  count,
  labels,
  onWrite,
}: ReviewsHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 self-stretch pt-[23px]">
      <div className="flex flex-col">
        <h1 className="pt-2 text-[32px] font-semibold leading-[48px]  tracking-[-1px] text-ink md:text-[42px] md:leading-[63px]">
          {labels.title}
        </h1>
        <RatingSummary
          average={average}
          count={count}
          countLabel={labels.reviews}
        />
      </div>
      <button
        type="button"
        onClick={onWrite}
        className="h-[42px] min-w-[182px] rounded-lg bg-brand/10 px-8 text-[15px] text-orange-500 font-semibold leading-5 text-brand transition-colors hover:bg-brand/20"
      >
        {labels.writeReview}
      </button>
    </header>
  );
}
