import { Reveal, RevealImage } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <Section id="experience" tone="dark" labelledBy="experience-title">
      <Container>
        <RevealImage>
          <PlaceholderImage
            slot="interior"
            tone="dark"
            sizes="(min-width: 1280px) 1184px, 100vw"
            ratioClass="aspect-[4/3] sm:aspect-[3/2]"
          />
        </RevealImage>

        <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              id="experience-title"
              tone="dark"
              eyebrow="Experience"
              title="Come hungry. Leave happier."
            />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <p className="type-body-l text-cream/85">
              Toppins is a place to pause, eat well and spend time with the people who matter —
              bringing together bakery favourites, café comfort and food worth coming back for.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
