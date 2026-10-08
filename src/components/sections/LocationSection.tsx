import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/data/site";
import { getHoursWithDays } from "@/lib/hours";

/** `page` renders the heading as the page H1 (used on /contact). */
export function LocationSection({ page = false }: { page?: boolean }) {
  const details = [
    { label: "Place", value: site.name },
    { label: "Plus code", value: site.address.plusCode },
    {
      label: "Area",
      value: `${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
    },
    { label: "Phone", value: site.phone.display, href: site.phone.tel },
    { label: "Hours", value: getHoursWithDays() },
  ];

  // Badges only for services the owner has confirmed.
  const services = [
    site.takeaway.verified && site.takeaway.value && "Takeaway",
    site.delivery.verified && site.delivery.value && "Delivery",
  ].filter(Boolean);

  return (
    <Section id="location" labelledBy="location-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="location-title"
            as={page ? "h1" : "h2"}
            eyebrow="Visit"
            title="Find your way to Toppins."
          />

          <dl className="mt-10 divide-y divide-espresso/15 border-y border-espresso/15">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                <dt className="type-label pt-1 text-espresso/70">{d.label}</dt>
                <dd>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {services.length > 0 && (
            <p className="type-label mt-6 text-caramel-text">{services.join(" · ")}</p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={site.googleMapsUrl} icon="pin">
              Get Directions
            </Button>
            <Button href={site.phone.tel} variant="secondary" icon="phone">
              Call
            </Button>
            <WhatsAppButton request={{ intent: "order" }} variant="secondary">
              WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-espresso/15 bg-sand sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <iframe
              title={`Map showing ${site.name}, ${site.address.locality}`}
              src={site.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
