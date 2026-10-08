import { site } from "@/data/site";

export type Review = {
  id: string;
  /** Exact excerpt supplied by the owner or copied by the owner from Google. */
  excerpt: string;
  author: string;
  source: "Google";
};

// TODO(owner): paste real Google review excerpts here. Never write or edit reviews ourselves.
// While empty, the Reviews section shows the rating block and a link only.
export const reviews: Review[] = [];

export const ratingSummary = {
  source: "Google",
  count: site.reviewCount.value,
  /** Shown only when ratingValue.verified is true. */
  rating: site.ratingValue.verified ? site.ratingValue.value : null,
  url: site.googleReviewsUrl.value,
};
