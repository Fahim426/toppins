/**
 * Single source of truth for business facts.
 * Anything uncertain carries `verified: false` and a TODO(owner) comment.
 * UI must degrade gracefully while a value is unverified (see src/lib/hours.ts).
 */

export type Unverifiable<T> = { value: T; verified: boolean };

const PHONE_E164 = "+919995095100";

export const site = {
  name: "Toppins Bake & Cafe",
  shortName: "Toppins",
  tagline: "Bake the world a better place",

  phone: {
    display: "+91 99950 95100",
    e164: PHONE_E164,
    tel: `tel:${PHONE_E164}`,
    verified: true,
  },

  whatsapp: {
    /** Digits only, country code first. Used by src/lib/whatsapp.ts */
    number: "919995095100",
    verified: true,
  },

  address: {
    plusCode: "PX2M+H4C",
    locality: "Perumbadappu",
    region: "Kerala",
    postalCode: "679580",
    country: "India",
    countryCode: "IN",
    /** One-line display address */
    full: "PX2M+H4C, Perumbadappu, Kerala 679580, India",
    verified: true,
  },

  hours: {
    opens: "9:00 AM", // verified (Google listing)
    // TODO(owner): confirm closing time (~9:30 PM seen online, unverified)
    closes: { value: "9:30 PM", verified: false } as Unverifiable<string>,
    // TODO(owner): confirm which days the cafe is open (assumed daily, unverified)
    days: { value: "Daily", verified: false } as Unverifiable<string>,
  },

  /** Opens Google Maps directions to the listing (search-based, no invented coordinates). */
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Toppins+bake+and+cafe+Perumbadappu",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Toppins+bake+and+cafe+Perumbadappu&output=embed",

  // TODO(owner): replace with the share link of the official Google Business listing
  // (Maps > Share > Copy link). Until then this points at a Maps search for the listing.
  googleReviewsUrl: {
    value:
      "https://www.google.com/maps/search/?api=1&query=Toppins+bake+and+cafe+Perumbadappu",
    verified: false,
  } as Unverifiable<string>,

  instagram: "https://www.instagram.com/toppins_bakeandcafe/",
  facebook: "https://www.facebook.com/toppinsbakes/",

  // TODO(owner): confirm rating. Google shows 4.1, Justdial shows 3.9 from 71 ratings.
  ratingValue: { value: 4.1, verified: false } as Unverifiable<number>,
  reviewCount: { value: 84, verified: true } as Unverifiable<number>, // Google listing

  // TODO(owner): confirm takeaway is offered (listed as available on Google)
  takeaway: { value: true, verified: false } as Unverifiable<boolean>,
  // TODO(owner): confirm delivery is offered and define the delivery area
  delivery: { value: true, verified: false } as Unverifiable<boolean>,

  priceBand: "₹1–200", // verified (Google listing)

  // TODO(owner): set the production domain (canonical, sitemap, OG, JSON-LD url).
  // Can also be set with NEXT_PUBLIC_SITE_URL. JSON-LD omits url until this is verified.
  url: { value: "https://example.com", verified: false } as Unverifiable<string>,
} as const;

export type Site = typeof site;
