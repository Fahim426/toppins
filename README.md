# Toppins Bake and Cafe

[![Production Status](https://img.shields.io/badge/status-live-success?style=flat-square)](https://toppins-mocha.vercel.app)
[![Website](https://img.shields.io/badge/website-toppins--mocha.vercel.app-red?style=flat-square)](https://toppins-mocha.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

An editorial, responsive web experience for **Toppins Bake and Cafe (Toppins Bakers)**, the artisanal bakery and cafe located on the Guruvayur-Althara-Ponnani Road in Perumbadappu, Malappuram / Thrissur border, Kerala.

---

## Architectural Highlights & Features

- **Unified Continuous Scroll & Editorial Architecture:**
  - **Home (`#home`):** High-definition bakery hero with circular crest seal, 3-column architectural quick-info ribbon, curated specialties showcase, and cozy café highlight.
  - **Menu (`#menu`):** Full catalogue with real-time category filtering (`All`, `Cakes`, `Pastries`, `Breads`, `Snacks`, `Beverages`), verified pricing, and instant tray addition.
  - **Custom Cakes (`#custom-cakes`):** 4-step bespoke consultation studio with interactive real-time flavour switching, weight pills, occasion datalists, and structured WhatsApp enquiry briefs.
  - **Our Story (`#about`):** Heritage narrative, 4-pillar brand values (Quality, Freshness, Community, Celebration), craftsmanship photography, and philosophy.
  - **Gallery (`#gallery`):** Responsive editorial masonry grid, category filters, and accessible fullscreen keyboard-friendly lightbox modal.
  - **Contact & Visit (`#contact`):** Store details, click-to-call, direct WhatsApp, interactive Google Maps embed, and accessible inquiry form.
  - **Continuous Scroll & Scroll-Spy:** Seamless scrolling throughout all sections on a single continuous page, with automated active-link scroll-spy and smooth sticky-header offset navigation. Standalone endpoints (`/menu`, `/custom-cakes`, `/about`, `/gallery`, `/contact`) deep-link seamlessly into the continuous scroll experience.

- **Floating Order Tray (Multi-Item WhatsApp Commerce Drawer):**
  - Aggregates bakery selections across pages into a unified slide-up drawer.
  - Dynamic quantity counters, badge bumps, and single-tap checkout generating structured plain-text orders to `+91 75589 95100`.

- **Mobile Quick Action Dock:**
  - Fixed luxury bottom navigation bar on mobile viewports (< 768px) with one-tap access to **Call**, **Directions**, **Cakes**, **Order Tray**, and **WhatsApp Chat**.

- **Zero-Emoji & Bespoke SVG Iconography:**
  - Strict elimination of decorative system emojis in favor of bespoke inline SVGs: triple-star motifs, symmetrical wheat dividers, and 1.5px stroke icons.

- **Accurate Business Status:**
  - Computes opening status in `Asia/Kolkata` independently of visitor device timezone (09:00 AM – 09:30 PM IST).

---

## Technology Stack

- **Markup:** Semantic HTML5 with accessible ARIA landmarks and WCAG 2.1 AA compliance.
- **Styling:** Vanilla Modern CSS with CSS Grid, Flexbox, Custom Properties, fluid clamp typography, and restrained elevation shadows.
- **Scripting:** Pure Vanilla JavaScript (Zero runtime bloat or heavy framework dependencies).
- **Typography:** Self-hosted Latin WOFF2 (*Playfair Display*, *Plus Jakarta Sans*, *Poppins*, *Pacifico*).
- **Deployment:** Vercel Global Edge Network with cache-revalidation headers and local Node dev server (`scripts/dev-server.mjs`).

---

## Local Development & Testing

1. **Start the local dev server:**
   ```bash
   node scripts/dev-server.mjs
   # or
   npm run dev
   ```
2. Open `http://localhost:4173` in your browser.

---

## Visit Toppins Outlets

- **Outlet 1: Toppins Bakers · Althara (Primary Order & Hotline Desk)**
  - Address: Near CSB Bank, Thadakam Township, Althara – Punnayoorkulam, Kadikkad, Kerala 679561
  - Google Maps: [Althara Directions](https://maps.app.goo.gl/qe7Fa1P3nk8NEmpK7?g_st=iw)
- **Outlet 2: Toppins Bake and Cafe · Perumbadappu (Bake & Cafe)**
  - Address: Near Puthanpally Central Madrassa, Guruvayur–Althara–Ponnani Road, Perumbadappu, Kerala 679580
  - Google Maps: [Perumbadappu Directions](https://www.google.com/maps/search/?api=1&query=PX2M%2BH4C%20Perumbadappu%20Kerala)
- **Central Phone Hotline:** [+91 75589 95100](tel:+917558995100)
- **WhatsApp Direct Order:** [+91 75589 95100](https://wa.me/917558995100)
- **Hours:** 09:00 AM – 09:30 PM IST, Open 7 Days a Week
