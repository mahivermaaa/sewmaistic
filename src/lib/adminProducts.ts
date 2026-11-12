import crypto from "crypto";
import { revalidatePath } from "next/cache";

export interface ProductInput {
  title?: string;
  price?: number;
  category?: string;
  description?: string;
  outOfStock?: boolean;
  isNewArrival?: boolean;
  isFanFavourite?: boolean;
  images?: string[];
  reviewText?: string;
  reviewRating?: number;
}

const IMAGE_REF = /^image-[A-Za-z0-9]+-\d+x\d+-[a-z0-9]+$/;

// Validates what the admin page sends. requireAll = true when creating a product.
export function parseProduct(body: unknown, requireAll: boolean, categories: string[]): { data: ProductInput } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." };
  const r = body as Record<string, unknown>;
  const has = (k: string) => r[k] !== undefined;
  const out: ProductInput = {};

  if (requireAll || has("title")) {
    const t = typeof r.title === "string" ? r.title.trim() : "";
    if (!t || t.length > 120) return { error: "Please enter a product name (up to 120 characters)." };
    out.title = t;
  }
  if (requireAll || has("price")) {
    const n = Number(r.price);
    if (!Number.isInteger(n) || n < 1 || n > 1000000) return { error: "Price must be a whole number of rupees, for example 849." };
    out.price = n;
  }
  if (requireAll || has("category")) {
    if (typeof r.category !== "string" || !categories.includes(r.category)) return { error: "Please choose a category." };
    out.category = r.category;
  }
  if (requireAll || has("description")) {
    const d = typeof r.description === "string" ? r.description.trim() : "";
    if (d.length > 2000) return { error: "Description is too long (max 2000 characters)." };
    out.description = d;
  }
  for (const k of ["outOfStock", "isNewArrival", "isFanFavourite"] as const) {
    if (requireAll || has(k)) out[k] = r[k] === true;
  }
  if (has("reviewText")) {
    const t = typeof r.reviewText === "string" ? r.reviewText.trim() : "";
    if (t.length > 200) return { error: "The review is too long (max 200 characters)." };
    out.reviewText = t;
  }
  if (has("reviewRating")) {
    const n = Number(r.reviewRating);
    if (!Number.isInteger(n) || n < 1 || n > 5) return { error: "Rating must be a whole number from 1 to 5." };
    out.reviewRating = n;
  }
  if (requireAll || has("images")) {
    const imgs = r.images;
    if (!Array.isArray(imgs) || imgs.length < 1 || imgs.length > 8 || !imgs.every((i) => typeof i === "string" && IMAGE_REF.test(i))) {
      return { error: "Please add between 1 and 8 photos." };
    }
    out.images = imgs as string[];
  }
  return { data: out };
}

export const imageObjects = (refs: string[]) =>
  refs.map((ref) => ({
    _type: "image",
    _key: crypto.randomBytes(6).toString("hex"),
    asset: { _type: "reference", _ref: ref },
  }));

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "product";

// Makes the public site pick up changes straight away.
export function refreshSite() {
  try {
    revalidatePath("/", "layout");
  } catch (err) {
    console.error("revalidate failed:", err);
  }
}
