import { Product } from "@/types/sewdarlin";
import { NEW_ARRIVALS, FAN_FAVOURITES, THRIFT_STORE } from "@/data/sewdarlinData";

export interface CategoryDef {
  slug: string;
  title: string;
  filter: (p: Product) => boolean;
}

// De-duplicated catalogue (the "-fav" entry is the same item as in New Arrivals)
const CATALOGUE: Product[] = [
  ...NEW_ARRIVALS,
  ...FAN_FAVOURITES.filter((p) => !p.id.endsWith("-fav")),
  ...THRIFT_STORE,
];

const WESTERN = /cowboy|cowgirl|western|boots|wrangler/i;

export const CATEGORIES: CategoryDef[] = [
  { slug: "all-products", title: "All Products", filter: () => true },
  { slug: "bags", title: "Bags", filter: (p) => p.category === "Bags" || p.category === "Lip Balm Holders" },
  { slug: "bows", title: "Bows", filter: (p) => p.category === "Hair Bows" || p.category === "Lip Balm Holders" },
  { slug: "boot-bows", title: "Boot Bows", filter: () => false },
  { slug: "fan-favourites", title: "Fan Favourites", filter: (p) => FAN_FAVOURITES.some((f) => f.id.replace(/-fav$/, "") === p.id) },
  { slug: "home-goods", title: "Home Goods", filter: (p) => p.category === "Home Goods" },
  { slug: "kindle-book-essentials", title: "Kindle & Book Essentials", filter: (p) => p.category === "Kindle Cases" },
  { slug: "new-arrivals", title: "New Arrivals", filter: (p) => NEW_ARRIVALS.some((n) => n.id === p.id) },
  { slug: "rodeo-collection", title: "Rodeo Collection", filter: (p) => WESTERN.test(p.title) || WESTERN.test(p.id) },
  { slug: "scrunchies", title: "Scrunchies", filter: (p) => p.category === "Scrunchies" },
  { slug: "sale", title: "Sale", filter: () => false },
  // Top-level homepage collections
  { slug: "cosplay-costumes", title: "Cosplay Costumes", filter: () => false },
  { slug: "thrift-store", title: "Thrift Store", filter: (p) => THRIFT_STORE.some((t) => t.id === p.id) },
  {
    slug: "little-somethings",
    title: "Little Somethings",
    filter: (p) => ["Scrunchies", "Hair Bows", "Lip Balm Holders", "Home Goods"].includes(p.category),
  },
];

// Sidebar "Browse by" list (same order as the reference design)
export const BROWSE_SLUGS = [
  "all-products", "bags", "bows", "boot-bows", "fan-favourites", "home-goods",
  "kindle-book-essentials", "new-arrivals", "rodeo-collection", "scrunchies", "sale",
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryProducts(slug: string): Product[] {
  const cat = getCategory(slug);
  return cat ? CATALOGUE.filter(cat.filter) : [];
}
