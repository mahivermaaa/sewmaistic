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
  // The "Sale" card on the home page is always shown, even for shops created before this category
  // existed — make sure it has a real category here too, so its cover photo can be edited.
  if (!rows.some((r) => r.slug === "sale")) {
    await sanityMutate([
      {
        createIfNotExists: {
          _id: "category-sale",
          _type: "category",
          title: "Sale",
          slug: { _type: "slug", current: "sale" },
          sortOrder: Math.max(-1, ...rows.map((r) => r.sortOrder ?? 0)) + 1,
        },
      },
    ]);
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
