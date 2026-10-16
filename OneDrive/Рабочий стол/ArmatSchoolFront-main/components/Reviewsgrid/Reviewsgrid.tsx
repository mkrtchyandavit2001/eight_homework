import type { ReviewsGridProps } from "@/types/types";
import ReviewCard from "../Reviewcard/Reviewcard";


export default function ReviewsGrid({ reviews, labels, onOpenFull }: ReviewsGridProps) {
  if (!reviews.length) return <p className="mt-8 text-muted">{labels.empty}</p>;

  return (
    <div className="mt-8 grid grid-cols-1 items-start gap-8 self-stretch md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} labels={labels} onOpenFull={onOpenFull} />
      ))}
    </div>
  );
}