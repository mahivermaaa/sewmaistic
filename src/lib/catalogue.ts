import { Product } from "@/types/sewdarlin";
import seed from "@/data/products-seed.json";
import { CategoryInfo, DEFAULT_CATEGORIES } from "./adminCategories";

// Where products come from:
//  - Sanity (the client's dashboard) when NEXT_PUBLIC_SANITY_PROJECT_ID is set
//  - otherwise (or if Sanity can't be reached) the local copy in products-seed.json
const SEED = seed as Product[];

const API_VERSION = "2025-01-01";

// Only complete, published products are shown. Order: sortOrder, then newest first.
const QUERY = `*[_type == "product" && defined(slug.current) && defined(price) && count(images) > 0]
  | order(coalesce(sortOrder, 0) asc, _createdAt desc){
    "id": slug.current,
    title,
    price,
    category,
    description,
    outOfStock,
    isNewArrival,
    isFanFavourite,
    "images": images[].asset->url
  }`;

interface SanityProduct {
  id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
  outOfStock?: boolean;
  isNewArrival?: boolean;
  isFanFavourite?: boolean;
  images: string[];
}

const toProduct = (p: SanityProduct): Product => {
  const images = p.images.map((u) => `${u}?w=1200&auto=format`);
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    formattedPrice: `₹${p.price.toLocaleString("en-IN")}`,
    currency: "INR",
    image: images[0],
    ...(images.length > 1 ? { images } : {}),
    category: p.category || "Other",
    description: p.description || undefined,
    outOfStock: p.outOfStock || undefined,
    isNewArrival: !!p.isNewArrival,
    isFanFavourite: !!p.isFanFavourite,
  };
};

export async function getCatalogue(): Promise<Product[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return SEED;

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const url =
    `https://${projectId}.apicdn.sanity.io/v${API_VERSION}/data/query/${dataset}` +
    `?query=${encodeURIComponent(QUERY)}`;

  try {
    // Re-check Sanity at most once a minute, so client edits show up quickly.
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
    const json = (await res.json()) as { result?: SanityProduct[] };
    const live = (json.result ?? []).map(toProduct);
    // Nothing published in Sanity yet (before the first migration) -> keep showing the local copy.
    return live.length > 0 ? live : SEED;
  } catch (err) {
    console.error("Could not load products from Sanity, using the local copy:", err);
    return SEED;
  }
}

// Used by checkout: prices always come from here, never from the browser.
export async function getProductById(id: string): Promise<Product | undefined> {
  const all = await getCatalogue();
  return all.find((p) => p.id === id);
}

// Category list managed from the admin panel (falls back to the default list).
export async function getCategories(): Promise<CategoryInfo[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return DEFAULT_CATEGORIES;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const query = `*[_type == "category" && defined(slug.current) && defined(title)]
    | order(coalesce(sortOrder, 0) asc, _createdAt asc){ "slug": slug.current, title }`;
  const url =
    `https://${projectId}.apicdn.sanity.io/v${API_VERSION}/data/query/${dataset}` +
    `?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
    const json = (await res.json()) as { result?: CategoryInfo[] };
    return json.result && json.result.length > 0 ? json.result : DEFAULT_CATEGORIES;
  } catch (err) {
    console.error("Could not load categories from Sanity, using the default list:", err);
    return DEFAULT_CATEGORIES;
  }
}
