import type { Review, ReviewsLabels } from "@/types/types";



// Static, language-independent data (index order must match dict.reviewsPage.items)
const baseReviews: Pick<Review, "id" | "rating" | "flag">[] = [
  { id: 1, rating: 4, flag: "🇩🇪" },
  { id: 2, rating: 5, flag: "🇨🇦" },
  { id: 3, rating: 5, flag: "🇫🇷" },
  { id: 4, rating: 5, flag: "🇦🇺" },
  { id: 5, rating: 5, flag: "🇺🇸" },
];

// English fallback (used if the dictionary is missing something)
export const reviews: Review[] = [
  { id: 1, rating: 4, name: "Anna V.", location: "Berlin, Germany", flag: "🇩🇪", text: "Excellent program with dedicated native teachers." },
  { id: 2, rating: 5, name: "David T.", location: "Toronto, Canada", flag: "🇨🇦", text: "The flexible scheduling is a lifesaver for our busy family." },
  { id: 3, rating: 5, name: "Lena H.", location: "Paris, France", flag: "🇫🇷", text: "Connecting my children to our culture through language was a dream. Armat made it real." },
  { id: 4, rating: 5, name: "Armen K.", location: "Sydney, Australia", flag: "🇦🇺", text: "We tried many platforms but Armat is different. Personal, premium, and actually fun for our kids." },
  { id: 5, rating: 5, name: "Sarah M.", location: "Los Angeles, USA", flag: "🇺🇸", text: "My daughter went from knowing zero Armenian to reading full sentences in 3 months." },
];

export const labels: ReviewsLabels = {
  title: "All Reviews",
  writeReview: "+ Write a Review",
  allRatings: "All Ratings",
  readMore: "Read more",
  showLess: "Show less",
  fullReview: "Full review",
  backToHome: "← Back to Home",
  reviews: "reviews",
  empty: "No reviews yet.",
};

// Dictionary texts are wrapped in quotes («...» or "..."); strip them
// so the output matches the previous data format.
function stripQuotes(text: string): string {
  return text.replace(/^[«"“]\s*/, "").replace(/\s*[»"”]$/, "");
}

export function getReviews(dict: any): Review[] {
  const items: ReviewItemDict[] = dict?.reviewsPage?.items ?? [];

  return baseReviews.map((base, index) => {
    const fallback = reviews[index];
    const item = items[index];

    return {
      ...base,
      name: item?.name ?? fallback.name,
      location: item?.location ?? fallback.location,
      text: item?.text ? stripQuotes(item.text) : fallback.text,
    };
  });
}

export function getLabels(dict: any): ReviewsLabels {
  const page: ReviewsPageDict = dict?.reviewsPage ?? {};

  return {
    title: page.title ?? labels.title,
    writeReview: page.writeReview ?? labels.writeReview,
    allRatings: page.allRatings ?? labels.allRatings,
    readMore: page.readMore ?? labels.readMore,
    showLess: page.showLess ?? labels.showLess,
    fullReview: page.fullReview ?? labels.fullReview,
    backToHome: page.backToHome ?? labels.backToHome,
    reviews: page.reviews ?? labels.reviews,
    empty: page.empty ?? labels.empty,
  };
}