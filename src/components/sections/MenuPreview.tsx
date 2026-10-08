import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MenuEmpty } from "@/components/ui/MenuEmpty";
import { MenuFilter } from "@/components/ui/MenuFilter";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleCategories, getVisibleItems } from "@/lib/menu";

export function MenuPreview() {
  const items = getVisibleItems();
  const categories = getVisibleCategories();

  return (
    <Section id="menu" labelledBy="menu-title" className="border-t border-espresso/10">
      <Container>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="menu-title"
            eyebrow="The menu"
            title="Find your favourite."
            description="Filter by category. Order any item on WhatsApp."
          />
          <Button href="/menu" variant="secondary" arrow className="self-start">
            View Full Menu
          </Button>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          {items.length > 0 ? (
            <MenuFilter items={items} categories={categories} limit={8} />
          ) : (
            <MenuEmpty />
          )}
        </div>
      </Container>
    </Section>
  );
}
