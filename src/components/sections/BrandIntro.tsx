import { Reveal, RevealImage } from "@/components/motion/Reveal";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ImageId } from "@/data/images";

type Category = { title: string; href: string; slot: ImageId; index: string };

const colA: Category[] = [
  { title: "Bakery", href: "/menu", slot: "category-bakery", index: "01" },
  { title: "Cafe Favourites", href: "/menu", slot: "category-cafe", index: "03" },
];
const colB: Category[] = [
  { title: "Celebration Cakes", href: "/cakes", slot: "category-cakes", index: "02" },
  { title: "Desserts & Drinks", href: "/menu", slot: "category-desserts", index: "04" },
];

export function BrandIntro() {
  return (
    <Section labelledBy="intro-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionHeading
                id="intro-title"
                eyebrow="Toppins"
                title="A little bit of everything you crave."
                description="From bakery favourites to cakes, savoury bites, desserts and refreshing drinks, Toppins brings together the things people come back for."
              />
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-7 lg:col-start-6 lg:gap-8">
          <div className="space-y-8 sm:space-y-12">
            {colA.map((c) => (
              <RevealImage key={c.title}>
                <CategoryCard {...c} />
              </RevealImage>
            ))}
          </div>
          <div className="mt-12 space-y-8 sm:mt-20 sm:space-y-12 lg:mt-28">
            {colB.map((c) => (
              <RevealImage key={c.title} delay={0.12}>
                <CategoryCard {...c} />
              </RevealImage>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
