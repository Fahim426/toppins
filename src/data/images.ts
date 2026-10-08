/**
 * Registry of every image slot on the site.
 * To use a real photo: drop the file at `path` (under /public) and set `available: true`.
 * ASSETS_NEEDED.md is generated from this file: `npm run assets:doc`.
 */

export type ImageSlot = {
  path: string;
  /** Aspect ratio [w, h] */
  ratio: [number, number];
  /** Recommended export size in px */
  width: number;
  height: number;
  alt: string;
  section: string;
  /** True once the real file exists at `path`. */
  available: boolean;
  /** Decorative images render with alt="". */
  decorative?: boolean;
  note?: string;
};

function slot(
  path: string,
  ratio: [number, number],
  width: number,
  section: string,
  alt: string,
  extra: Partial<ImageSlot> = {},
): ImageSlot {
  return {
    path,
    ratio,
    width,
    height: Math.round((width * ratio[1]) / ratio[0]),
    alt,
    section,
    available: false,
    ...extra,
  };
}

export const images = {
  hero: slot("/images/hero/hero.jpg", [16, 9], 2400, "Home: Hero", "Toppins Bake & Cafe", {
    note: "Cinematic, darker or mid-tone; text sits over it. Keep subject centre or right so it survives a portrait crop on mobile.",
  }),

  "cakes-feature": slot("/images/cakes/feature.jpg", [4, 5], 1400, "Home: Cakes", "Cakes at Toppins"),
  "cakes-detail": slot("/images/cakes/detail.jpg", [1, 1], 900, "Home: Cakes", "Cake detail at Toppins", { note: "Close crop, shown as a small inset over the feature photo." }),

  "category-bakery": slot("/images/food/category-bakery.jpg", [3, 4], 1200, "Home: Brand intro", "Bakery favourites at Toppins"),
  "category-cakes": slot("/images/food/category-cakes.jpg", [3, 4], 1200, "Home: Brand intro", "Celebration cakes at Toppins"),
  "category-cafe": slot("/images/food/category-cafe.jpg", [3, 4], 1200, "Home: Brand intro", "Cafe favourites at Toppins"),
  "category-desserts": slot("/images/food/category-desserts.jpg", [3, 4], 1200, "Home: Brand intro", "Desserts and drinks at Toppins"),

  "cake-birthday": slot("/images/cakes/birthday.jpg", [4, 5], 1200, "Cakes", "Birthday cake from Toppins", { note: "Only if birthday cakes are confirmed." }),
  "cake-celebration": slot("/images/cakes/celebration.jpg", [4, 5], 1200, "Cakes", "Celebration cake from Toppins", { note: "Only if celebration cakes are confirmed." }),
  "cake-custom": slot("/images/cakes/custom.jpg", [4, 5], 1200, "Cakes", "Custom cake from Toppins", { note: "Only if custom cakes are confirmed." }),
  "cake-photo": slot("/images/cakes/photo.jpg", [4, 5], 1200, "Cakes", "Photo cake from Toppins", { note: "Only if photo cakes are confirmed." }),

  interior: slot("/images/interior/interior.jpg", [3, 2], 2400, "Home: Experience", "Inside Toppins Bake & Cafe", {
    note: "Large, wide interior shot with people if possible.",
  }),

  // Gallery: varied ratios for the masonry. Refine alt text once real photos are placed.
  "gallery-1": slot("/images/gallery/gallery-01.jpg", [4, 5], 1200, "Home: Gallery", "Toppins gallery photo 1"),
  "gallery-2": slot("/images/gallery/gallery-02.jpg", [1, 1], 1200, "Home: Gallery", "Toppins gallery photo 2"),
  "gallery-3": slot("/images/gallery/gallery-03.jpg", [3, 4], 1200, "Home: Gallery", "Toppins gallery photo 3"),
  "gallery-4": slot("/images/gallery/gallery-04.jpg", [4, 3], 1600, "Home: Gallery", "Toppins gallery photo 4"),
  "gallery-5": slot("/images/gallery/gallery-05.jpg", [4, 5], 1200, "Home: Gallery", "Toppins gallery photo 5"),
  "gallery-6": slot("/images/gallery/gallery-06.jpg", [3, 4], 1200, "Home: Gallery", "Toppins gallery photo 6"),
  "gallery-7": slot("/images/gallery/gallery-07.jpg", [1, 1], 1200, "Home: Gallery", "Toppins gallery photo 7"),
  "gallery-8": slot("/images/gallery/gallery-08.jpg", [4, 5], 1200, "Home: Gallery", "Toppins gallery photo 8"),
  "gallery-9": slot("/images/gallery/gallery-09.jpg", [4, 3], 1600, "Home: Gallery", "Toppins gallery photo 9"),
  "gallery-10": slot("/images/gallery/gallery-10.jpg", [3, 4], 1200, "Home: Gallery", "Toppins gallery photo 10"),

} satisfies Record<string, ImageSlot>;

export type ImageId = keyof typeof images;

/** Menu item photos live in /public/images/products/ (see src/data/menu.ts, `image`). */
export const productImageSpec = {
  folder: "/images/products/",
  ratio: [4, 5] as [number, number],
  width: 1000,
  height: 1250,
};

/** Logo files expected in /public/images/. */
export const logoSpec = [
  { path: "public/images/logo.svg", note: "Primary logo, SVG preferred (colour)." },
  { path: "public/images/logo-light.svg", note: "Cream/white version for dark backgrounds." },
  { path: "public/images/icon.png", note: "Square mark, at least 512×512 px. Replaces the placeholder \"T\" favicon (src/app/icon.tsx, apple-icon.tsx)." },
  {
    path: "src/app/opengraph-image.jpg",
    note: "Optional. 1200×630, keep key content in the centre 1000×500. Until supplied a generated brand card is used (src/app/opengraph-image.tsx); to use a photo add this file, delete the .tsx, and point lib/seo.ts at the new image.",
  },
];
