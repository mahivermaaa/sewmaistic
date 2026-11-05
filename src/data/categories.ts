import { Product } from "@/types/sewdarlin";

export interface CategoryDef {
  slug: string;
  title: string;
  filter: (p: Product) => boolean;
}

const WESTERN = /cowboy|cowgirl|western|boots|wrangler/i;

export const CATEGORIES: CategoryDef[] = [
  { slug: "all-products", title: "All Products", filter: () => true },
  { slug: "bags", title: "Bags", filter: (p) => p.category === "Bags" },
  { slug: "boot-bows", title: "Boot Bows", filter: () => false },
  { slug: "fan-favourites", title: "Fan Favourites", filter: (p) => !!p.isFanFavourite },
  { slug: "new-arrivals", title: "New Arrivals", filter: (p) => !!p.isNewArrival },
  { slug: "rodeo-collection", title: "Rodeo Collection", filter: (p) => WESTERN.test(p.title) || WESTERN.test(p.id) },
  { slug: "sale", title: "Sale", filter: () => false },
  { slug: "dresses", title: "Dresses", filter: (p) => /dress/i.test(p.title) },
  { slug: "tops", title: "Tops", filter: (p) => /\b(top|tee|camisole|tank)\b/i.test(p.title) },
  { slug: "clay-art", title: "Clay Art", filter: () => false },
  // Top-level homepage collections
  { slug: "cosplay-costumes", title: "Cosplay Costumes", filter: (p) => p.category === "Cosplay Costumes" },
  { slug: "thrift-store", title: "Thrift Store", filter: (p) => p.category === "Thrift Store" },
  { slug: "little-somethings", title: "Little Somethings", filter: (p) => p.category === "Little Somethings" },
];

// Sidebar "Browse by" list (same order as the reference design)
export const BROWSE_SLUGS = [
  "all-products", "bags", "dresses", "tops", "cosplay-costumes", "clay-art", "little-somethings", "sale",
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

// Products come from the catalogue (Sanity), already in the right order.
export function getCategoryProducts(slug: string, products: Product[]): Product[] {
  const cat = getCategory(slug);
  return cat ? products.filter(cat.filter) : [];
}
