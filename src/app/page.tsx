import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/data/site";

// Phase 1 foundation preview. The real Home sections are built in Phase 2.
export default function HomePage() {
  return (
    <>
      <section className="dark-surface relative isolate flex min-h-[80dvh] items-end overflow-hidden bg-espresso pt-header text-cream">
        <PlaceholderImage
          slot="hero"
          tone="dark"
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full rounded-none border-0"
        />
        <Container className="pb-16 lg:pb-24">
          <p className="type-label mb-5 text-butter">Bake • Cafe • Good times</p>
          <h1 className="type-display-xl max-w-[14ch]">Bake the world a better place.</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/menu" variant="inverse" size="lg" arrow>
              Explore Menu
            </Button>
            <Button href={site.googleMapsUrl} variant="outline-inverse" size="lg" icon="pin">
              Get Directions
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            number="01"
            eyebrow="Foundation"
            title="Made for your moments."
            description="Shared primitives: buttons, headings, containers and image placeholders."
            className="lg:col-span-6"
          />
          <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">
            <WhatsAppButton request={{ intent: "order" }} />
            <WhatsAppButton request={{ intent: "cake" }} variant="secondary" />
            <Button href="/menu" variant="link" arrow>
              View full menu
            </Button>
          </div>
        </Container>
        <Container className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <PlaceholderImage slot="category-bakery" sizes="(min-width: 640px) 25vw, 50vw" />
          <PlaceholderImage slot="category-cakes" sizes="(min-width: 640px) 25vw, 50vw" />
          <PlaceholderImage slot="category-cafe" sizes="(min-width: 640px) 25vw, 50vw" />
          <PlaceholderImage slot="category-desserts" sizes="(min-width: 640px) 25vw, 50vw" />
        </Container>
      </section>
    </>
  );
}
