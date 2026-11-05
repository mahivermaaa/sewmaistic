import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityMutate } from "@/lib/sanityAdmin";
import { loadCategories } from "@/lib/adminCategoryStore";
import { imageObjects, parseProduct, refreshSite } from "@/lib/adminProducts";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });
const ID = /^product-[A-Za-z0-9._-]+$/;

type Ctx = { params: Promise<{ id: string }> };

// Update any subset of: title, price, category, description, outOfStock, isNewArrival, isFanFavourite, images
export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  const { id } = await params;
  if (!ID.test(id)) return fail("Unknown product.", 404);

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
  const parsed = parseProduct(body, false, titles);
  if ("error" in parsed) return fail(parsed.error, 400);

  const { images, ...rest } = parsed.data;
  const set: Record<string, unknown> = { ...rest };
  if (images) set.images = imageObjects(images);
  if (Object.keys(set).length === 0) return fail("Nothing to change.", 400);

  try {
    await sanityMutate([{ patch: { id, set } }]);
  } catch (err) {
    console.error(err);
    return fail("Could not save the changes. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  const { id } = await params;
  if (!ID.test(id)) return fail("Unknown product.", 404);
  try {
    await sanityMutate([{ delete: { id } }]);
  } catch (err) {
    console.error(err);
    return fail("Could not delete the product. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}
