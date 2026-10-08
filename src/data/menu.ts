export type MenuCategory =
  | "cakes"
  | "bakery"
  | "snacks"
  | "sandwiches"
  | "pizza"
  | "shawarma"
  | "meals"
  | "desserts"
  | "beverages";

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "cakes", label: "Cakes" },
  { id: "bakery", label: "Bakery" },
  { id: "snacks", label: "Snacks" },
  { id: "sandwiches", label: "Sandwiches" },
  { id: "pizza", label: "Pizza" },
  { id: "shawarma", label: "Shawarma" },
  { id: "meals", label: "Meals" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Beverages" },
];

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  /** Rupees. Stays null until the owner confirms; UI then shows "Ask on WhatsApp". */
  price: number | null;
  /** Path under /public, or null to show the placeholder. */
  image: string | null;
  tags: string[];
  /** Sample data for development. Filtered out in production (see src/lib/menu.ts). */
  placeholder?: boolean;
};

// TODO(owner): replace the placeholder items below with the real menu
// (names, categories, prices, photos). Names here come only from items publicly
// mentioned online; descriptions and prices are intentionally empty.
export const menuItems: MenuItem[] = [
  { id: "sample-cake", name: "Cake", category: "cakes", description: "", price: null, image: null, tags: [], placeholder: true },
  { id: "sample-pastry", name: "Pastry", category: "bakery", description: "", price: null, image: null, tags: [], placeholder: true },
  { id: "sample-chicken-sandwich", name: "Chicken sandwich", category: "sandwiches", description: "", price: null, image: null, tags: [], placeholder: true },
  { id: "sample-pizza", name: "Pizza", category: "pizza", description: "", price: null, image: null, tags: [], placeholder: true },
  { id: "sample-shawarma", name: "Shawarma", category: "shawarma", description: "", price: null, image: null, tags: [], placeholder: true },
  { id: "sample-falooda", name: "Falooda", category: "desserts", description: "", price: null, image: null, tags: [], placeholder: true },
];
