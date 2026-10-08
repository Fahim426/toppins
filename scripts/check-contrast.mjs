// WCAG contrast check for every text/background pair used on the site. Run: npm run check:contrast
// Reads colour tokens from src/app/globals.css so it cannot drift from the real palette.
// Translucent text (e.g. text-espresso/70) is composited over its background before measuring.
// Exits 1 if any pair is below its required ratio (4.5 for body text, 3 for large text and UI).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const css = readFileSync(fileURLToPath(new URL("../src/app/globals.css", import.meta.url)), "utf8");
const root = css.match(/:root\s*{([\s\S]*?)}/)[1];
const token = (name) => {
  const m = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --${name} not found`);
  return m[1];
};
const C = {
  espresso: token("espresso"),
  cream: token("cream"),
  sand: token("sand"),
  caramel: token("caramel"),
  caramelText: token("caramel-text"),
  butter: token("butter"),
  charcoal: token("charcoal"),
  warm: token("warm-white"),
  // Dark placeholder used under the hero text in development/production placeholders
  heroPlaceholder: "#3b2e28",
};

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (fg, bg, a) => rgb(fg).map((v, i) => v * a + rgb(bg)[i] * (1 - a));
const lum = ([r, g, b]) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [description, foreground token, background token, alpha of foreground, required ratio]
const pairs = [
  // Light surfaces
  ["Body text on cream", "espresso", "cream", 1, 4.5],
  ["Body text on warm-white", "espresso", "warm", 1, 4.5],
  ["Body text on sand", "espresso", "sand", 1, 4.5],
  ["Description (espresso/75) on cream", "espresso", "cream", 0.75, 4.5],
  ["Description (espresso/75) on warm-white", "espresso", "warm", 0.75, 4.5],
  ["Description (espresso/75) on sand", "espresso", "sand", 0.75, 4.5],
  ["Label (espresso/70) on cream", "espresso", "cream", 0.7, 4.5],
  ["Label (espresso/70) on warm-white", "espresso", "warm", 0.7, 4.5],
  ["Label (espresso/70) on sand", "espresso", "sand", 0.7, 4.5],
  ["Eyebrow (espresso/80) on sand", "espresso", "sand", 0.8, 4.5],
  ["Small caramel-text on cream (links, prices, eyebrow)", "caramelText", "cream", 1, 4.5],
  ["Small caramel-text on warm-white", "caramelText", "warm", 1, 4.5],
  ["Large caramel on cream (84+ numeral)", "caramel", "cream", 1, 3],
  // Interactive
  ["Primary button: cream on espresso", "cream", "espresso", 1, 4.5],
  ["Primary button hover: cream on charcoal", "cream", "charcoal", 1, 4.5],
  ["Secondary button hover: cream on espresso", "cream", "espresso", 1, 4.5],
  ["Inverse button: espresso on cream", "espresso", "cream", 1, 4.5],
  ["Inverse button hover: espresso on sand", "espresso", "sand", 1, 4.5],
  ["Pressed chip: cream on espresso", "cream", "espresso", 1, 4.5],
  ["Action-bar WhatsApp cell: cream on caramel-text", "cream", "caramelText", 1, 4.5],
  // Dark surfaces
  ["Text on espresso (cream)", "cream", "espresso", 1, 4.5],
  ["Text on espresso (cream/90)", "cream", "espresso", 0.9, 4.5],
  ["Text on espresso (cream/85)", "cream", "espresso", 0.85, 4.5],
  ["Text on espresso (cream/80)", "cream", "espresso", 0.8, 4.5],
  ["Footer small text (cream/70) on espresso", "cream", "espresso", 0.7, 4.5],
  ["Eyebrow / links: butter on espresso", "butter", "espresso", 1, 4.5],
  ["Hero text on placeholder (cream)", "cream", "heroPlaceholder", 1, 4.5],
  ["Hero support (cream/90) on placeholder", "cream", "heroPlaceholder", 0.9, 4.5],
  ["Hero eyebrow: butter on placeholder", "butter", "heroPlaceholder", 1, 4.5],
  // Non-text (1.4.11): boundaries that identify inputs and chips, and focus rings
  ["Input / chip border (espresso/60) on warm-white", "espresso", "warm", 0.6, 3],
  ["Input / chip border (espresso/60) on cream", "espresso", "cream", 0.6, 3],
  ["Focus ring caramel-text on cream", "caramelText", "cream", 1, 3],
  ["Focus ring caramel-text on warm-white", "caramelText", "warm", 1, 3],
  ["Focus ring caramel-text on sand", "caramelText", "sand", 1, 3],
  ["Focus ring butter on espresso", "butter", "espresso", 1, 3],
  ["Focus ring butter on caramel-text (action bar)", "butter", "caramelText", 1, 3],
];

let failed = 0;
console.log("Ratio  Need  Result  Pair");
for (const [name, fg, bg, alpha, need] of pairs) {
  const fgRgb = alpha < 1 ? mix(C[fg], C[bg], alpha) : rgb(C[fg]);
  const r = ratio(fgRgb, rgb(C[bg]));
  const ok = r >= need;
  if (!ok) failed++;
  console.log(`${r.toFixed(2).padStart(5)}  ${String(need).padStart(4)}  ${ok ? "pass  " : "FAIL  "}  ${name}`);
}
console.log(failed ? `\n${failed} pair(s) below WCAG AA` : "\nAll pairs meet WCAG AA");
process.exit(failed ? 1 : 0);
