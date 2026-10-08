"use client";

import { useState } from "react";
import { m, type Variants } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { MenuCategory, MenuItem } from "@/data/menu";
import { cn } from "@/lib/cn";
import { setUrlHash, useUrlHash } from "@/lib/urlHash";

type Props = {
  items: MenuItem[];
  categories: { id: MenuCategory; label: string }[];
  /** Max items shown per filter (Home preview). Omit to show everything. */
  limit?: number;
  /** Keep the selected category in the URL hash (/menu#pizza). Used on /menu only. */
  syncUrl?: boolean;
  /** Heading level for item names (h2 on /menu where the H1 is the page title). */
  headingAs?: "h2" | "h3";
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Interactive category filter shared by Home and /menu.
 * Callers only pass categories that have visible items, so empty categories never render.
 */
export function MenuFilter({ items, categories, limit, syncUrl = false, headingAs }: Props) {
  const [localActive, setLocalActive] = useState<MenuCategory | "all">("all");
  const hash = useUrlHash();

  const fromHash = categories.find((c) => c.id === hash)?.id;
  const active: MenuCategory | "all" = syncUrl ? (fromHash ?? "all") : localActive;

  const select = (id: MenuCategory | "all") => {
    if (syncUrl) setUrlHash(id === "all" ? null : id);
    else setLocalActive(id);
  };

  const matching = active === "all" ? items : items.filter((i) => i.category === active);
  const shown = limit ? matching.slice(0, limit) : matching;
  const chips = [{ id: "all" as const, label: "All" }, ...categories];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter menu by category"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {chips.map((chip) => {
          const pressed = active === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(chip.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold transition-colors duration-200",
                pressed
                  ? "border-espresso bg-espresso text-cream"
                  : "border-espresso/60 text-espresso hover:border-espresso",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        Showing {shown.length} {shown.length === 1 ? "item" : "items"}
        {active !== "all" && ` in ${categories.find((c) => c.id === active)?.label}`}
      </p>

      <m.ul
        key={active}
        variants={list}
        initial="hidden"
        animate="show"
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6"
      >
        {shown.map((item) => (
          <m.li key={item.id} variants={card}>
            <ProductCard item={item} headingAs={headingAs} />
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}
