import { NextResponse } from "next/server";
import crypto from "crypto";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityMutate } from "@/lib/sanityAdmin";
import { loadCategories, productCategoryCounts, validCategoryTitle } from "@/lib/adminCategoryStore";
import { RESERVED_SLUGS } from "@/lib/adminCategories";
import { refreshSite, slugify } from "@/lib/adminProducts";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function GET() {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  try {
    const [cats, counts] = await Promise.all([loadCategories(), productCategoryCounts()]);
    return NextResponse.json({ categories: cats.map((c) => ({ ...c, count: counts.get(c.title) ?? 0 })) });
  } catch (err) {
    console.error(err);
    return fail("Could not load categories from Sanity.", 502);
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);

  let body: { title?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const title = validCategoryTitle(body.title);
  if (!title) return fail("Please enter a category name (up to 40 characters).", 400);

  try {
    const cats = await loadCategories();
    let slug = slugify(title);
    // Names with no latin letters (e.g. Hindi) get a generated web address.
    if (slug === "product" && !title.toLowerCase().includes("product")) slug = `category-${crypto.randomBytes(2).toString("hex")}`;
    if (RESERVED_SLUGS.includes(slug)) return fail("That name is reserved by the shop. Please pick another.", 400);
    if (cats.some((c) => c.slug === slug || c.title.toLowerCase() === title.toLowerCase())) {
      return fail("A category with that name already exists.", 400);
    }
    const sortOrder = Math.max(-1, ...cats.map((c) => c.sortOrder ?? 0)) + 1;
    await sanityMutate([
      { create: { _id: `category-${slug}`, _type: "category", title, slug: { _type: "slug", current: slug }, sortOrder } },
    ]);
  } catch (err) {
    console.error(err);
    return fail("Could not save the category. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}
