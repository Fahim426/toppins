# ASSETS_NEEDED

Generated from `src/data/images.ts` (run `npm run assets:doc`). Do not edit by hand.

To use a real photo: save it at the path below, then set `available: true` for that slot in `src/data/images.ts`.
Export as JPG (or WebP), sRGB, under ~400 KB where possible. No stock photos; use only photos the owner has the right to use.

## Logo and brand

| File | Note |
|---|---|
| `public/images/logo.svg` | Primary logo, SVG preferred (colour). |
| `public/images/logo-light.svg` | Cream/white version for dark backgrounds. |
| `public/images/icon.png` | Square mark, at least 512×512 px, for favicon and app icon. |

Once the logo arrives, the palette in `src/app/globals.css` is checked against it and adjusted if needed.

## Image slots

| Slot | Path | Ratio | Recommended px | Used in | Status | Notes |
|---|---|---|---|---|---|---|
| `hero` | `public/images/hero/hero.jpg` | 16:9 | 2400×1350 | Home: Hero | needed | Cinematic, darker or mid-tone; text sits over it. Keep subject centre or right so it survives a portrait crop on mobile. |
| `cakes-feature` | `public/images/cakes/feature.jpg` | 4:5 | 1400×1750 | Home: Cakes | needed |  |
| `cakes-detail` | `public/images/cakes/detail.jpg` | 1:1 | 900×900 | Home: Cakes | needed | Close crop, shown as a small inset over the feature photo. |
| `category-bakery` | `public/images/food/category-bakery.jpg` | 3:4 | 1200×1600 | Home: Brand intro | needed |  |
| `category-cakes` | `public/images/food/category-cakes.jpg` | 3:4 | 1200×1600 | Home: Brand intro | needed |  |
| `category-cafe` | `public/images/food/category-cafe.jpg` | 3:4 | 1200×1600 | Home: Brand intro | needed |  |
| `category-desserts` | `public/images/food/category-desserts.jpg` | 3:4 | 1200×1600 | Home: Brand intro | needed |  |
| `cake-birthday` | `public/images/cakes/birthday.jpg` | 4:5 | 1200×1500 | Cakes | needed | Only if birthday cakes are confirmed. |
| `cake-celebration` | `public/images/cakes/celebration.jpg` | 4:5 | 1200×1500 | Cakes | needed | Only if celebration cakes are confirmed. |
| `cake-custom` | `public/images/cakes/custom.jpg` | 4:5 | 1200×1500 | Cakes | needed | Only if custom cakes are confirmed. |
| `cake-photo` | `public/images/cakes/photo.jpg` | 4:5 | 1200×1500 | Cakes | needed | Only if photo cakes are confirmed. |
| `interior` | `public/images/interior/interior.jpg` | 3:2 | 2400×1600 | Home: Experience | needed | Large, wide interior shot with people if possible. |
| `gallery-1` | `public/images/gallery/gallery-01.jpg` | 4:5 | 1200×1500 | Home: Gallery | needed |  |
| `gallery-2` | `public/images/gallery/gallery-02.jpg` | 1:1 | 1200×1200 | Home: Gallery | needed |  |
| `gallery-3` | `public/images/gallery/gallery-03.jpg` | 3:4 | 1200×1600 | Home: Gallery | needed |  |
| `gallery-4` | `public/images/gallery/gallery-04.jpg` | 4:3 | 1600×1200 | Home: Gallery | needed |  |
| `gallery-5` | `public/images/gallery/gallery-05.jpg` | 4:5 | 1200×1500 | Home: Gallery | needed |  |
| `gallery-6` | `public/images/gallery/gallery-06.jpg` | 3:4 | 1200×1600 | Home: Gallery | needed |  |
| `gallery-7` | `public/images/gallery/gallery-07.jpg` | 1:1 | 1200×1200 | Home: Gallery | needed |  |
| `gallery-8` | `public/images/gallery/gallery-08.jpg` | 4:5 | 1200×1500 | Home: Gallery | needed |  |
| `gallery-9` | `public/images/gallery/gallery-09.jpg` | 4:3 | 1600×1200 | Home: Gallery | needed |  |
| `gallery-10` | `public/images/gallery/gallery-10.jpg` | 3:4 | 1200×1600 | Home: Gallery | needed |  |
| `og-image` | `public/images/og.jpg` | 1200:630 | 1200×630 | SEO: Open Graph / Twitter | needed | Logo or best food photo; keep key content inside the centre 1000×500. |

## Menu item photos

Folder `public/images/products/`, 4:5, 1000×1250 px.
Reference each file from the item's `image` field in `src/data/menu.ts`.
