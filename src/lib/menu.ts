import {
  menuCategories,
  menuItems,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";

/** Placeholders show in dev, or in production only when explicitly enabled. */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function getVisibleItems(): MenuItem[] {
  return menuItems.filter((item) => showPlaceholders || !item.placeholder);
}

/** Categories with zero visible items are hidden. */
export function getVisibleCategories(): { id: MenuCategory; label: string }[] {
  const used = new Set(getVisibleItems().map((item) => item.category));
  return menuCategories.filter((c) => used.has(c.id));
}

export function formatPrice(price: number | null): string {
  return price === null ? "Ask on WhatsApp" : `₹${price}`;
}
