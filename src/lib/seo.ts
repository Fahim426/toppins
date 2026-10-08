import type { Metadata } from "next";
import { site } from "@/data/site";

/** Production origin. Env var wins; otherwise the placeholder in site.ts (see TODO(owner) there). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url.value).replace(/\/$/, "");
export const siteUrlVerified = Boolean(process.env.NEXT_PUBLIC_SITE_URL) || site.url.verified;

export const defaultTitle = "Toppins Bake & Cafe | Bakery, Cakes & Cafe in Perumbadappu";
export const defaultDescription =
  "Discover Toppins Bake & Cafe in Perumbadappu, Kerala — cakes, bakery favourites, cafe bites, desserts and more. Explore the menu, visit us or order on WhatsApp.";

/** Generated brand cards (src/app/opengraph-image.tsx, twitter-image.tsx). */
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}. ${site.tagline}.` };
const twitterImage = { url: "/twitter-image", width: 1200, height: 630, alt: ogImage.alt };

type PageMeta = {
  /** Short page title; the root layout template appends the brand. Omit for Home. */
  title?: string;
  description: string;
  /** Path used for the canonical URL, e.g. "/menu" */
  path: string;
};

/**
 * Per-page metadata. Open Graph and Twitter are set here in full because a page-level
 * `openGraph` replaces the parent's rather than merging with it.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : defaultTitle;
  return {
    title: title ?? { absolute: defaultTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [twitterImage],
    },
  };
}
