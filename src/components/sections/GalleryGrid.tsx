import { Reveal, RevealImage } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import type { ImageId } from "@/data/images";

// Each slot appears once. Mixed ratios (4:5, 1:1, 3:4, 4:3) give the masonry its rhythm.
const slots: ImageId[] = [
  "gallery-1",
  "gallery-2",
  "gallery-3",
  "gallery-4",
  "gallery-5",
  "gallery-6",
  "gallery-7",
  "gallery-8",
  "gallery-9",
  "gallery-10",
];

export function GalleryGrid() {
  return (
    <Section id="gallery" tone="warm" labelledBy="gallery-title">
      <Container>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="gallery-title" eyebrow="Gallery" title="Moments at Toppins." />
          <Button href={site.instagram} variant="secondary" icon="instagram" className="self-start">
            Follow on Instagram
          </Button>
        </Reveal>

        <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:mt-20 lg:columns-3 lg:gap-6">
          {slots.map((slot, i) => (
            <RevealImage
              key={slot}
              delay={(i % 3) * 0.08}
              className="group mb-3 break-inside-avoid sm:mb-4 lg:mb-6"
            >
              <PlaceholderImage
                slot={slot}
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, 48vw"
                imgClassName="transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
              />
            </RevealImage>
          ))}
        </div>
      </Container>
    </Section>
  );
}
