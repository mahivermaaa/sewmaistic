import { sanityMutate, sanityQuery } from "./sanityAdmin";
import { DEFAULT_CATEGORIES } from "./adminCategories";

export interface CategoryRow {
  _id: string;
  slug: string;
  title: string;
  sortOrder?: number;
  image?: { ref: string; url: string } | null;
}

const Q = `*[_type == "category" && defined(slug.current) && defined(title) && !(_id in path("drafts.**"))]
  | order(coalesce(sortOrder, 0) asc, _createdAt asc){
    _id, "slug": slug.current, title, sortOrder,
    "image": image.asset->{ "ref": _id, url }
  }`;

// Reads the category list; the very first time (none saved yet) it saves the default list.
export async function loadCategories(): Promise<CategoryRow[]> {
  const rows = await sanityQuery<CategoryRow[]>(Q);
  if (rows.length === 0) {
    await sanityMutate(
      DEFAULT_CATEGORIES.map((c, i) => ({
        createIfNotExists: {
          _id: `category-${c.slug}`,
          _type: "category",
          title: c.title,
          slug: { _type: "slug", current: c.slug },
          sortOrder: i,
        },
      }))
    );
    return sanityQuery<CategoryRow[]>(Q);
  }
  return rows;
}

export async function productCategoryCounts() {
  const list = await sanityQuery<(string | null)[]>(
    `*[_type == "product" && !(_id in path("drafts.**"))].category`
  );
  const counts = new Map<string, number>();
  for (const c of list) if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  return counts;
}

export function validCategoryTitle(v: unknown): string | null {
  const t = typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "";
  return t && t.length <= 40 ? t : null;
}
