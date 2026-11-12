import { NextResponse } from "next/server";
import crypto from "crypto";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityMutate, sanityQuery } from "@/lib/sanityAdmin";
import { loadCategories } from "@/lib/adminCategoryStore";
import { imageObjects, parseProduct, refreshSite, slugify } from "@/lib/adminProducts";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

const QUERY = `*[_type == "product" && !(_id in path("drafts.**"))]
  | order(coalesce(sortOrder, 0) asc, _createdAt desc){
    _id, "slug": slug.current, title, price, category, description,
    outOfStock, isNewArrival, isFanFavourite, reviewText, reviewRating,
    "images": images[]{ "ref": asset._ref, "url": asset->url }
  }`;

interface Row {
  images?: { ref?: string; url?: string }[];
  [key: string]: unknown;
}

export async function GET() {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) {
    return fail("Sanity isn't connected yet: add NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN to the server settings.", 500);
  }
  try {
    const rows = await sanityQuery<Row[]>(QUERY);
    const products = rows.map((r) => ({ ...r, images: (r.images ?? []).filter((i) => i.ref && i.url) }));
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return fail("Could not load products from Sanity.", 502);
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  let titles: string[];
  try {
    titles = (await loadCategories()).map((c) => c.title);
  } catch {
    return fail("Could not load categories.", 502);
  }
  const parsed = parseProduct(body, true, titles);
  if ("error" in parsed) return fail(parsed.error, 400);
  const d = parsed.data;

  const slug = `${slugify(d.title as string)}-${crypto.randomBytes(2).toString("hex")}`;
  try {
    await sanityMutate([
      {
        create: {
          _id: `product-${slug}`,
          _type: "product",
          title: d.title,
          slug: { _type: "slug", current: slug },
          price: d.price,
          category: d.category,
          description: d.description,
          outOfStock: d.outOfStock,
          isNewArrival: d.isNewArrival,
          isFanFavourite: d.isFanFavourite,
          reviewText: d.reviewText,
          reviewRating: d.reviewRating,
          images: imageObjects(d.images as string[]),
        },
      },
    ]);
  } catch (err) {
    console.error(err);
    return fail("Could not save the product. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true, id: `product-${slug}` });
}
