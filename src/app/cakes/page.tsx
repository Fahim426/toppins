import type { Metadata } from "next";
import { Reveal, RevealImage, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CakeEnquiry } from "@/components/ui/CakeEnquiry";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getVisibleCakeTypes } from "@/lib/cakes";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Cakes | Toppins Bake & Cafe",
  description:
    "Enquire about a cake at Toppins Bake & Cafe, Perumbadappu. Tell us the occasion, size, flavour and date on WhatsApp.",
};

export default function CakesPage() {
  const types = getVisibleCakeTypes();

  return (
    <>
      <header className="bg-sand pt-header">
        <Container className="grid items-center gap-14 pt-14 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-32">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionHeading
                as="h1"
                tone="sand"
                eyebrow="Cakes"
                title="Made for your moments."
                description="Planning something to celebrate? Message us on WhatsApp to enquire about a cake."
              />
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton request={{ intent: "cake" }} size="lg" />
                <Button href="#cake-details" variant="secondary" size="lg">
                  Tell us the details
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <RevealImage>
              <PlaceholderImage
                slot="cakes-feature"
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </RevealImage>
            <Reveal
              delay={0.25}
              className="absolute -bottom-10 -left-10 hidden w-[44%] rounded-lg border-[6px] border-sand lg:block"
            >
              <PlaceholderImage slot="cakes-detail" sizes="20vw" />
            </Reveal>
          </div>
        </Container>
      </header>

      {types.length > 0 && (
        <Section labelledBy="types-title">
          <Container>
            <Reveal>
              <SectionHeading id="types-title" eyebrow="Styles" title="Pick a starting point." />
            </Reveal>
            <Stagger className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-6">
              {types.map((t, i) => (
                <StaggerItem key={t.id} className={cn(i % 2 === 1 && "lg:mt-16")}>
                  <article className="group">
                    <PlaceholderImage
                      slot={t.image}
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-espresso/20 pt-3">
                      <h3 className="type-display-m">{t.label}</h3>
                      {t.sample && (
                        <span className="type-label text-[0.625rem] text-espresso/70">Sample</span>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      <Section id="cake-details" tone="warm" labelledBy="details-title">
        <Container>
          <Reveal>
            <SectionHeading
              id="details-title"
              eyebrow="Your cake"
              title="Tell us what you need."
              description="Fill in what you know. Every field is optional."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12 lg:mt-16">
            <CakeEnquiry />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
