import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { site } from "@/data/site";
import { getHoursLabel } from "@/lib/hours";

// Entrance is CSS-only (animate-fade-up) so the H1 and the LCP image never wait on JS.
const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="dark-surface relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-espresso pt-header text-cream"
    >
      <div className="animate-settle absolute inset-0 -z-20">
        <PlaceholderImage
          slot="hero"
          tone="dark"
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0"
        />
      </div>
      {/* Scrim: keeps the header and headline legible over any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso/90 via-espresso/20 to-espresso/55"
      />

      <Container className="pb-8 lg:pb-12">
        <p className="type-label animate-fade-up mb-6 text-butter" style={delay(0.1)}>
          Bake • Cafe • Good times
        </p>
        <h1
          id="hero-title"
          className="type-display-xl animate-fade-up max-w-[12ch] lg:max-w-[14ch]"
          style={delay(0.2)}
        >
          Bake the world a better place.
        </h1>
        <p
          className="type-body-l animate-fade-up mt-6 max-w-[34ch] text-cream/90"
          style={delay(0.35)}
        >
          Cakes, bakes and café favourites in Perumbadappu.
        </p>
        <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={delay(0.5)}>
          <Button href="/menu" variant="inverse" size="lg" arrow>
            Explore Menu
          </Button>
          <Button href={site.googleMapsUrl} variant="outline-inverse" size="lg" icon="pin">
            Get Directions
          </Button>
        </div>

        <p
          className="type-label animate-fade-up mt-14 border-t border-cream/25 pt-5 text-cream/85 lg:mt-20"
          style={delay(0.7)}
        >
          {getHoursLabel()} <span aria-hidden="true">·</span>
          <span className="sr-only">,</span> {site.address.locality}
        </p>
      </Container>
    </section>
  );
}
