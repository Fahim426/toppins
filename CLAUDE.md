# CLAUDE.md — Toppins Bake & Cafe website

You are acting as a senior brand designer, UX engineer and frontend architect.
Build a production-quality website for a real local business. Read this file fully before every session.

## 1. Business facts

| Field | Value | Status |
|---|---|---|
| Name | Toppins Bake & Cafe | verified |
| Tagline (their Instagram bio) | Bake the world a better place | verified |
| Address | PX2M+H4C, Perumbadappu, Kerala 679580, India | verified |
| Phone / WhatsApp | +91 99950 95100 (wa.me/919995095100) | verified |
| Opens | 9:00 AM | verified (Google listing) |
| Closing time | ~9:30 PM | UNVERIFIED, owner must confirm |
| Google reviews count | 84 | verified (Google listing) |
| Google rating | 4.1 | UNVERIFIED (Justdial shows 3.9 from 71 ratings) |
| Takeaway / Delivery | listed as available | UNVERIFIED, delivery area unknown |
| Instagram | https://www.instagram.com/toppins_bakeandcafe/ | verified |
| Facebook | https://www.facebook.com/toppinsbakes/ | verified |
| Price band | ₹1–200 | verified (Google listing) |
| Publicly mentioned items | cakes, pastries, shawarma, chicken sandwiches, pizza, sandwiches, falooda, other cafe items | unverified detail |

Every UNVERIFIED value lives in `src/data/site.ts` with `verified: false` and a `// TODO(owner): confirm` comment. The UI must degrade gracefully while a value is unverified (e.g. show "Opens 9:00 AM" instead of a full range).

## 2. Hard content rules

- NEVER invent products, prices, history, founders, awards, certifications, ingredients, testimonials or services.
- NEVER use filler or unverified claims: "freshly baked every hour", "handcrafted", "artisan", "best bakery in Kerala", "finest ingredients", "since 19XX", "authentic".
- Missing info becomes a clearly marked placeholder in the data files, never invented text.
- Missing price → show "Ask on WhatsApp".
- Menu categories with zero confirmed items are hidden, not shown empty.
- Reviews: only real excerpts supplied by the owner or copied by the owner from Google. Otherwise show the rating block and a "Read all Google reviews" link only.
- Voice: short sentences, strong headlines, confident hospitality tone, minimal fluff. Warm, not luxury-Parisian.

## 3. Creative direction

MODERN KERALA CAFE + PREMIUM BAKERY + EDITORIAL FOOD PHOTOGRAPHY + WARM HOSPITALITY.
Feels: warm, appetising, contemporary, locally rooted, premium but approachable. Target reaction: "That looks like a place I actually want to visit." NOT: "AI-generated restaurant website."

Avoid: generic Indian-bakery templates, cupcake illustrations, coffee-bean clichés, heavy brown/gold, excessive gradients, glassmorphism, big shadows, giant pill buttons, over-rounded cards, neon, overcrowded sections, fake testimonials.

Use: large photography, asymmetric editorial layouts, generous whitespace, thin borders, subtle texture, restrained corner radius (4–12px), strong crops.

Conceptual references only (never copy layout, text, assets or branding): TAB Kitchen & Bakery, Magnolia Bakery, Flour Bakery + Cafe, Levain (hero + palette), Debaere (short headline + gallery), Tiff's Treats (order clarity). These lean upscale; keep Toppins neighbourly.

If a real logo or brand assets exist in the repo, inspect them first and adapt the palette to them. Real assets override the provisional palette below.

## 4. Design tokens

Dominant: cream + espresso + restrained caramel.

```
--espresso:      #2B211D;
--cream:         #F7F2EA;
--sand:          #E8D8C5;
--caramel:       #B87545;  /* large type, borders, icons ONLY (≈3.3:1 on cream) */
--caramel-text:  #9A5A2E;  /* use for any small caramel text or links */
--butter:        #E9C982;  /* tiny accents only */
--charcoal:      #24211F;
--warm-white:    #FFFDF9;
```

- All text must meet WCAG AA (4.5:1 body, 3:1 large). Verify, don't assume.
- Define tokens as CSS variables and Tailwind theme colours.

Typography (fixed, do not substitute):
- Display: DM Serif Display
- Body/UI: Manrope
- Malayalam fallback in the font stack: Noto Sans Malayalam
- Large editorial headlines, compact uppercase labels (tracking-wide), comfortable body (16–18px, 1.6 line height).

## 5. Tech stack

- Next.js (App Router), TypeScript, Tailwind CSS.
- Framer Motion only through `LazyMotion` + `domAnimation` and `m` components. No other animation libraries.
- next/font for fonts, next/image for images (set `images.unoptimized: true` if using static export; otherwise default).
- Host target: Vercel (default) unless told otherwise.
- Avoid unnecessary dependencies. Explain any package you add.

## 6. Pages and sections

Pages: `/` Home, `/menu`, `/cakes`, `/contact`. (About copy lives in the Home "Experience" section. Gallery is a Home section; a `/gallery` page may be added later.)

Header nav: Logo · Menu · Cakes · Gallery (anchor) · Contact · primary CTA "Order on WhatsApp". Secondary CTA "Get Directions".
- Desktop: transparent over hero, becomes solid cream/espresso on scroll with a smooth transition.
- Mobile: hamburger + logo + WhatsApp CTA, plus a sticky bottom action bar: MENU · WHATSAPP · CALL · DIRECTIONS.

Home sections, in order:
1. **Hero** — large cinematic image slot (priority-loaded). Eyebrow: `BAKE • CAFE • GOOD TIMES`. Headline: "Bake the world a better place." Support: "Cakes, bakes and café favourites in Perumbadappu." CTAs: Explore Menu, Get Directions. Info row: `OPENS 9:00 AM · PERUMBADAPPU` (extend with closing time only when verified). Minimal text over the image.
2. **Brand intro** — "A little bit of everything you crave." Copy: "From bakery favourites to cakes, savoury bites, desserts and refreshing drinks, Toppins brings together the things people come back for." Four image category blocks: Bakery · Celebration Cakes · Cafe Favourites · Desserts & Drinks.
3. **Signature** — "Made to be remembered." Editorial grid using only confirmed items; otherwise marked placeholders. Optional BESTSELLER tag only if confirmed. CTA: View Full Menu.
4. **Menu preview** — interactive HTML category filter (All, Cakes, Bakery, Snacks, Sandwiches, Pizza, Shawarma, Meals, Desserts, Beverages), smooth transitions, hide empty categories. Never a PDF.
5. **Cakes** — "Made for your moments." Show only confirmed cake types (candidates: Birthday, Celebration, Custom, Photo). CTA "Enquire About a Cake" → WhatsApp with prefilled "Hi Toppins, I'd like to enquire about a cake."
6. **Experience** — "Come hungry. Leave happier." Large interior image slot. Copy: "Toppins is a place to pause, eat well and spend time with the people who matter — bringing together bakery favourites, café comfort and food worth coming back for."
7. **Reviews** — "Loved by our neighbourhood." Show "84+ Google reviews" (and the rating only when verified). Link "Read all Google reviews" to the official listing.
8. **Gallery** — editorial masonry with varied aspect ratios, subtle desktop hover, clean 2-column grid on mobile, no repeated images.
9. **Location** — "Find your way to Toppins." Name, plus code, area, phone, hours (as verified). Buttons: Get Directions, Call, WhatsApp. Embed: `https://www.google.com/maps?q=Toppins+bake+and+cafe+Perumbadappu&output=embed` (lazy). Show "Takeaway · Delivery" badges only when verified.
10. **Footer** — logo, short statement, quick links, phone, location, hours, Instagram + Facebook icons.

If a section feels empty, improve the composition. Do not pad with meaningless text. If it is unnecessary, remove it.

## 7. Data architecture

Business data is centralised; never scattered in components.

- `src/data/site.ts` — name, tagline, phone, whatsapp, address, plusCode, hours, googleMapsUrl, googleReviewsUrl, instagram, facebook, ratingValue, reviewCount, takeaway, delivery. Each uncertain field carries `verified: boolean`.
- `src/data/menu.ts` — items of shape `{ id, name, category, description, price, image, tags }`. `price` stays `null` until verified. Seed with a few clearly marked `placeholder: true` items so the UI can be developed; placeholders show a subtle "Sample item" marker in dev only and are filtered out in production unless `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`.
- `src/data/reviews.ts` — review excerpts (empty by default) plus rating summary.
- `src/lib/whatsapp.ts` — URL builder with encoded prefilled messages.

WhatsApp messages: order → "Hi Toppins, I'd like to place an order."; cake → "Hi Toppins, I'd like to enquire about a cake."; per-item → "Hi Toppins, I'd like to order: <item>." No fake e-commerce checkout. WhatsApp is the conversion path.

## 8. Components

Navbar, Hero, SectionHeading, CategoryCard, ProductCard, MenuFilter, MenuGrid, CakeSection, ReviewCard, GalleryGrid, LocationSection, WhatsAppButton, Footer, MobileActionBar. No giant page components. Keep data separate from presentation.

## 9. Images

- NEVER use stock photos or hotlinked images. Do not download images from the web.
- Build a placeholder system: warm tinted blocks at the correct aspect ratios, each visibly labelled in dev with the path to replace.
- Folder structure: `public/images/{hero,food,cakes,interior,gallery,products}/`.
- Generate and maintain `ASSETS_NEEDED.md`: every image slot, path, aspect ratio and recommended pixel size.
- When real images appear in the repo, prefer them, choose the strongest for hero, and wire them in.
- next/image with width, height, sizes; `priority` on the hero only; meaningful alt text; empty alt for decorative images.

## 10. Motion

Expensive, not flashy: fade-up, subtle image reveal, staggered product entrance, soft hover movement, menu filter transitions. No spinning, no heavy parallax, no bouncing buttons, no giant text animation, not on every element. Honour `prefers-reduced-motion`.

## 11. Responsive

Mobile first. Test at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920. Desktop is a designed layout, not stretched mobile. Use controlled max-widths; large desktop whitespace is intentional. No horizontal scroll at any size.

## 12. SEO and structured data

- Title: `Toppins Bake & Cafe | Bakery, Cakes & Cafe in Perumbadappu`
- Description: `Discover Toppins Bake & Cafe in Perumbadappu, Kerala — cakes, bakery favourites, cafe bites, desserts and more. Explore the menu, visit us or order on WhatsApp.`
- Metadata, Open Graph, Twitter cards, canonical placeholder, `sitemap.xml`, `robots.txt`, favicon, OG image, custom 404.
- JSON-LD `Bakery` (or `CafeOrCoffeeShop`) with name, address, telephone, sameAs, openingHours only when verified. Do NOT invent geo coordinates; include `geo` only if verified.

## 13. Accessibility and performance

- Semantic HTML, one H1 per page, proper heading order, skip link, visible focus states, keyboard-operable nav and filters, accessible mobile menu (focus trap, Escape to close), aria-pressed on filter chips.
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 100, Best Practices 95+.
- Lazy load below-the-fold, minimal JS, code splitting.

## 14. Working process

1. Inspect the repo and any supplied assets before deciding anything.
2. Propose a plan, wait for approval, then build in phases.
3. After each phase: run `npm run build` and `npm run lint`, fix all errors and warnings, check the console.
4. Use Playwright to screenshot at 375, 768 and 1440 px, then review for overflow, overlap, clipping and contrast issues, and fix them.
5. Check every link, CTA, anchor and image path.
6. Commit after each phase with a clear message.
7. Ask questions only when blocked. Otherwise make reasonable assumptions and list them at the end.
8. If something looks generic, redesign it.

## 15. Definition of done

Polished, responsive, fast, accessible, SEO-ready, conversion-focused, maintainable, original, with zero invented facts. README documents: editing data, swapping images, enabling placeholders, deploying, and every outstanding TODO(owner).
