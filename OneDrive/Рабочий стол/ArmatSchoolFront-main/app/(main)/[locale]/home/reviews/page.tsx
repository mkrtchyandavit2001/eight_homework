"use client";

import BackLink from "@/components/Backlink/Backlink";
import RatingFilter from "@/components/Ratingfilter/Ratingfilter";
import ReviewsGrid from "@/components/Reviewsgrid/Reviewsgrid";
import ReviewsHeader from "@/components/Reviewsheader/Reviewsheader";
import WriteReviewModal, {
  type ReviewFormData,
} from "@/components/WriteReviewModal/WriteReviewModal";
import { useLanguage } from "@/context/LanguageContext"; // ճշտիր path-ը ըստ քո նախագծի
import { getLabels, getReviews } from "@/data/reviews";
import type { AllReviewsPageProps, RatingFilterValue } from "@/types/types";
import { useCallback, useMemo, useState } from "react";

export default function AllReviewsPage({
  reviews: reviewsProp,
  labels: labelsProp,
  onWriteReview,
  onOpenFull,
}: AllReviewsPageProps) {
  const { dict } = useLanguage();
  const [filter, setFilter] = useState<RatingFilterValue>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = useMemo(() => reviewsProp ?? getReviews(dict), [reviewsProp, dict]);
  const labels = useMemo(() => labelsProp ?? getLabels(dict), [labelsProp, dict]);

  const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  const visible = useMemo(
    () => (filter === "all" ? reviews : reviews.filter((r) => r.rating === filter)),
    [reviews, filter]
  );

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    onWriteReview?.(); 
  }, [onWriteReview]);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleSubmit = useCallback((data: ReviewFormData) => {
    // TODO: API call / Redux dispatch (օր. dispatch(addReview(data)))
    console.log("New review:", data);
  }, []);

  return (
    <main className="mx-auto flex w-full mt-20 max-w-[1280px] flex-col items-start px-4 py-8 font-jakarta sm:px-10 sm:py-12">
      <BackLink label={labels.backToHome} />
      <ReviewsHeader
        average={average}
        count={reviews.length}
        labels={labels}
        onWrite={openModal}
      />
      <RatingFilter value={filter} onChange={setFilter} allLabel={labels.allRatings} />
      <ReviewsGrid reviews={visible} labels={labels} onOpenFull={onOpenFull} />

      <WriteReviewModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </main>
  );
}