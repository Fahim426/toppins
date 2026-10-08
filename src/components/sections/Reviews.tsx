import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ratingSummary, reviews } from "@/data/reviews";

export function Reviews() {
  return (
    <Section id="reviews" labelledBy="reviews-title">
      <Container className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <SectionHeading
            id="reviews-title"
            eyebrow="Reviews"
            title="Loved by our neighbourhood."
          />
        </Reveal>

        <Reveal delay={0.12} className="border-t border-espresso/20 pt-8 lg:col-span-5 lg:col-start-8">
          {/* Large caramel numeral is allowed (large text, 3:1) */}
          <p className="font-display text-[clamp(5rem,14vw,9rem)] leading-[0.9] text-caramel">
            {ratingSummary.count}+
          </p>
          <p className="type-label mt-4 text-espresso/80">{ratingSummary.source} reviews</p>
          {ratingSummary.rating !== null && (
            <p className="type-body-l mt-2">Rated {ratingSummary.rating} out of 5</p>
          )}
          <Button
            href={ratingSummary.url}
            variant="link"
            arrow
            className="mt-6 py-2 text-base"
          >
            Read all Google reviews
          </Button>
        </Reveal>
      </Container>

      {reviews.length > 0 && (
        <Container>
          <Stagger className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-24">
            {reviews.slice(0, 3).map((r) => (
              <StaggerItem key={r.id}>
                <ReviewCard review={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      )}
    </Section>
  );
}
