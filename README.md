# Toppins Bake & Cafe

Website for Toppins Bake & Cafe, Perumbadappu. Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion (LazyMotion only).
Project rules live in [CLAUDE.md](CLAUDE.md). The full handover README is completed in Phase 5; this is the Phase 1 summary.

## Commands

```bash
npm run dev          # local dev server (placeholder labels visible)
npm run build        # production build
npm run lint         # ESLint
npm run assets:doc   # regenerate ASSETS_NEEDED.md from src/data/images.ts
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

## Outstanding TODO(owner)

Search the codebase for `TODO(owner)`. Currently: closing time, opening days, rating, takeaway/delivery (and delivery area),
official Google reviews link, production domain, real menu, logo and photos.
