import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col justify-between border-t border-espresso/25 pt-6">
      <blockquote className="type-body-l">“{review.excerpt}”</blockquote>
      <figcaption className="type-label mt-6 text-espresso/70">
        {review.author} · {review.source}
      </figcaption>
    </figure>
  );
}
