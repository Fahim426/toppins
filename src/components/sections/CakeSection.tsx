import { Reveal, RevealImage } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getVisibleCakeTypes } from "@/lib/cakes";

export function CakeSection() {
  const types = getVisibleCakeTypes();

  return (
    <Section id="cakes" tone="sand" labelledBy="cakes-title">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <RevealImage>
            <PlaceholderImage slot="cakes-feature" sizes="(min-width: 1024px) 40vw, 90vw" />
          </RevealImage>
          {/* Small inset crop, desktop only */}
          <Reveal
            delay={0.25}
            className="absolute -right-10 -bottom-10 hidden w-[46%] rounded-lg border-[6px] border-sand lg:block"
          >
            <PlaceholderImage slot="cakes-detail" sizes="20vw" />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pl-8">
          <Reveal>
            <SectionHeading
              id="cakes-title"
              tone="sand"
              eyebrow="Cakes"
              title="Made for your moments."
              description="Planning something to celebrate? Message us on WhatsApp to enquire about a cake."
            />
          </Reveal>

          {types.length > 0 && (
            <Reveal delay={0.1}>
              <ul className="mt-10 divide-y divide-espresso/20 border-y border-espresso/20">
                {types.map((t) => (
                  <li
                    key={t.id}
                    className="type-display-m flex items-baseline justify-between gap-4 py-4"
                  >
                    {t.label}
                    {t.sample && (
                      <span className="type-label font-sans text-[0.625rem] text-espresso/70 not-italic">
                        Sample
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.15} className="mt-10">
            <WhatsAppButton request={{ intent: "cake" }} size="lg" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
