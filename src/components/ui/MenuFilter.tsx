"use client";

import { useState } from "react";
import { m, type Variants } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { MenuCategory, MenuItem } from "@/data/menu";
import { cn } from "@/lib/cn";

type Props = {
  items: MenuItem[];
  categories: { id: MenuCategory; label: string }[];
  /** Max items shown per filter (Home preview). */
  limit?: number;
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** Interactive category filter. Categories with no visible items are never passed in. */
export function MenuFilter({ items, categories, limit = 8 }: Props) {
  const [active, setActive] = useState<MenuCategory | "all">("all");

  const matching = active === "all" ? items : items.filter((i) => i.category === active);
  const shown = matching.slice(0, limit);
  const chips = [{ id: "all" as const, label: "All" }, ...categories];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter menu by category"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {chips.map((chip) => {
          const pressed = active === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(chip.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold transition-colors duration-200",
                pressed
                  ? "border-espresso bg-espresso text-cream"
                  : "border-espresso/30 text-espresso hover:border-espresso",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        Showing {shown.length} {shown.length === 1 ? "item" : "items"}
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
            <ProductCard item={item} />
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}
