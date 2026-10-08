// Generates ASSETS_NEEDED.md from src/data/images.ts.  Run: npm run assets:doc
// Uses Node's built-in TypeScript type stripping (Node 22.18+ / 24).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { images, logoSpec, productImageSpec } from "../src/data/images.ts";

const rows = Object.entries(images).map(([id, s]) => {
  const status = s.available ? "in repo" : "needed";
  return `| \`${id}\` | \`public${s.path}\` | ${s.ratio[0]}:${s.ratio[1]} | ${s.width}×${s.height} | ${s.section} | ${status} | ${s.note ?? ""} |`;
});

const md = `# ASSETS_NEEDED

Generated from \`src/data/images.ts\` (run \`npm run assets:doc\`). Do not edit by hand.

To use a real photo: save it at the path below, then set \`available: true\` for that slot in \`src/data/images.ts\`.
Export as JPG (or WebP), sRGB, under ~400 KB where possible. No stock photos; use only photos the owner has the right to use.

## Logo and brand

| File | Note |
|---|---|
${logoSpec.map((l) => `| \`${l.path}\` | ${l.note} |`).join("\n")}

Once the logo arrives, the palette in \`src/app/globals.css\` is checked against it and adjusted if needed.

## Image slots

| Slot | Path | Ratio | Recommended px | Used in | Status | Notes |
|---|---|---|---|---|---|---|
${rows.join("\n")}

## Menu item photos

Folder \`public${productImageSpec.folder}\`, ${productImageSpec.ratio[0]}:${productImageSpec.ratio[1]}, ${productImageSpec.width}×${productImageSpec.height} px.
Reference each file from the item's \`image\` field in \`src/data/menu.ts\`.
`;

writeFileSync(fileURLToPath(new URL("../ASSETS_NEEDED.md", import.meta.url)), md);
console.log("ASSETS_NEEDED.md written");
