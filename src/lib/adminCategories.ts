export interface CategoryInfo {
  slug: string;
  title: string;
}

// Starting list. After the first visit to /admin these live in Sanity and are managed from the Categories tab.
export const DEFAULT_CATEGORIES: CategoryInfo[] = [
  { slug: "bags", title: "Bags" },
  { slug: "cosplay-costumes", title: "Cosplay Costumes" },
  { slug: "thrift-store", title: "Thrift Store" },
  { slug: "little-somethings", title: "Little Somethings" },
  { slug: "clothing", title: "Clothing" },
];

// Page addresses that already mean something else on the shop.
export const RESERVED_SLUGS = ["all-products", "new-arrivals", "fan-favourites"];
