import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleItems } from "@/lib/menu";

// Column spans and crops by position: wide, tall, small. Bottom-aligned for an uneven skyline.
const layouts: Record<number, { span: string; width: number; height: number; offset: string }[]> = {
  1: [{ span: "lg:col-span-6", width: 1000, height: 1250, offset: "" }],
  2: [
    { span: "lg:col-span-6", width: 1000, height: 1250, offset: "" },
    { span: "lg:col-span-5 lg:col-start-8", width: 1000, height: 1000, offset: "lg:mb-24" },
  ],
  3: [
    { span: "lg:col-span-5", width: 1000, height: 1250, offset: "" },
    { span: "lg:col-span-4", width: 1000, height: 1250, offset: "lg:mb-24" },
    { span: "lg:col-span-3", width: 1000, height: 1000, offset: "lg:mb-8" },
  ],
};

/** Editorial grid of confirmed signature items only. Hidden when there are none. */
export function Signature() {
  const items = getVisibleItems()
    .filter((i) => i.signature)
    .slice(0, 3);
  if (items.length === 0) return null;
  const layout = layouts[items.length];

  return (
    <Section tone="warm" labelledBy="signature-title">
      <Container>
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="signature-title" eyebrow="Signature" title="Made to be remembered." />
          <Button href="/menu" variant="secondary" arrow className="self-start">
            View Full Menu
          </Button>
        </Reveal>

        <Stagger
          className={`mt-12 grid items-end gap-x-6 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 ${items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
        >
          {items.map((item, i) => (
            <StaggerItem key={item.id} className={`${layout[i].span} ${layout[i].offset}`}>
              <ProductCard
                item={item}
                width={layout[i].width}
                height={layout[i].height}
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
