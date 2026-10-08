# Toppins Bake & Cafe

Website for Toppins Bake & Cafe, Perumbadappu. Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion (LazyMotion only).
Project rules live in [CLAUDE.md](CLAUDE.md). The full handover README is completed in Phase 5; this is the Phase 1 summary.

## Commands

```bash
npm run dev          # local dev server (placeholder labels visible)
npm run build        # production build
npm run lint         # ESLint
npm run assets:doc   # regenerate ASSETS_NEEDED.md from src/data/images.ts
npm run check:contrast  # WCAG contrast check of every text/background pair in the palette
```

## Editing business data

All business facts live in `src/data/site.ts`. Uncertain values carry `verified: false` and a `TODO(owner)` comment; the UI
degrades gracefully until they are confirmed (e.g. "Opens 9:00 AM" instead of a full range).

- Menu: `src/data/menu.ts` (price `null` shows "Ask on WhatsApp")
- Reviews: `src/data/reviews.ts` (empty until the owner supplies real excerpts)
- WhatsApp links: `src/lib/whatsapp.ts`

## Images

Every slot is registered in `src/data/images.ts` and listed in [ASSETS_NEEDED.md](ASSETS_NEEDED.md).
Save the real file at the slot's path under `public/`, then set `available: true` for that slot.
Until then a tinted placeholder renders at the right aspect ratio, labelled with the path in development.

## Placeholders

Sample menu items (`placeholder: true`) show in development only. To show them in a production build, set
`NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` (see `.env.example`).

## SEO and structured data

- Per-page metadata comes from `pageMetadata()` in `src/lib/seo.ts`; the root layout holds the defaults and the title template.
- Set the production domain with `NEXT_PUBLIC_SITE_URL` (or `site.url` in `src/data/site.ts`). Until then canonicals, sitemap and robots point at `https://example.com`.
- JSON-LD (`Bakery`) is built from `site.ts` in `src/lib/jsonld.ts`. Unverified fields are left out: url, opening hours, rating. No geo and no street address are emitted.
- Open Graph / Twitter images and the favicon are generated placeholders (`src/app/opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`). See ASSETS_NEEDED.md for replacing them.

## Accessibility

`npm run check:contrast` measures every text and background pair against WCAG AA. Re-run it if you change a colour token.
When the real hero photo is added, check that the header and hero text stay readable over it (the scrims in `Hero.tsx` are tuned for mid-brightness photos).

## Outstanding TODO(owner)

Search the codebase for `TODO(owner)`. Currently: closing time, opening days, rating, takeaway/delivery (and delivery area),
official Google reviews link, production domain, real menu, logo and photos.
