import { site } from "@/data/site";
import { siteUrl, siteUrlVerified } from "@/lib/seo";

type JsonLd = Record<string, unknown>;

/** "9:00 AM" -> "09:00". Returns null for anything it cannot parse. */
function to24h(time: string): string | null {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) return null;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  return `${String(hours).padStart(2, "0")}:${match[2]}`;
}

/**
 * Bakery structured data built from src/data/site.ts.
 * Anything unverified is omitted: url, opening hours, rating. No geo and no street address
 * (only a plus code is known), so neither is emitted.
 */
export function buildBakeryJsonLd(): JsonLd {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: site.name,
    description: site.tagline,
    telephone: site.phone.e164,
    priceRange: site.priceBand,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    hasMap: site.googleMapsUrl,
    sameAs: [site.instagram, site.facebook],
  };

  if (siteUrlVerified) data.url = siteUrl;

  // Hours only when both the closing time and the days are confirmed
  // ("Daily" is the only day pattern handled).
  const { opens, closes, days } = site.hours;
  const open24 = to24h(opens);
  const close24 = closes.verified ? to24h(closes.value) : null;
  if (open24 && close24 && days.verified && days.value === "Daily") {
    data.openingHours = `Mo-Su ${open24}-${close24}`;
  }

  // Rating only when both the rating and the review count are confirmed.
  if (site.ratingValue.verified && site.reviewCount.verified) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: site.ratingValue.value,
      reviewCount: site.reviewCount.value,
    };
  }

  return data;
}
