import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityMutate, sanityQuery } from "@/lib/sanityAdmin";
import { loadCategories, productCategoryCounts, validCategoryTitle } from "@/lib/adminCategoryStore";
import { refreshSite } from "@/lib/adminProducts";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });
const ID = /^category-[a-z0-9-]+$/;

type Ctx = { params: Promise<{ id: string }> };

// Rename: also moves every product in the old category to the new name, in one save.
export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  const { id } = await params;
  if (!ID.test(id)) return fail("Unknown category.", 404);

  let body: { title?: unknown; image?: unknown; onSale?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const title = validCategoryTitle(body.title);
  if (!title) return fail("Please enter a category name (up to 40 characters).", 400);
  // image: a Sanity asset ref string to set the cover photo, or null to remove it; omitted = leave as is.
  const imageRef = typeof body.image === "string" ? body.image : body.image === null ? null : undefined;
  const onSale = typeof body.onSale === "boolean" ? body.onSale : undefined;

  try {
    const cats = await loadCategories();
    const cur = cats.find((c) => c._id === id);
    if (!cur) return fail("Unknown category.", 404);
    if (cats.some((c) => c._id !== id && c.title.toLowerCase() === title.toLowerCase())) {
      return fail("A category with that name already exists.", 400);
    }

    const set: Record<string, unknown> = {};
    const unset: string[] = [];
    if (title !== cur.title) set.title = title;
    if (imageRef !== undefined) {
      if (imageRef) set.image = { _type: "image", asset: { _type: "reference", _ref: imageRef } };
      else unset.push("image");
    }
    if (onSale !== undefined && onSale !== !!cur.onSale) set.onSale = onSale;

    const mutations: unknown[] = [];
    if (Object.keys(set).length > 0 || unset.length > 0) {
      mutations.push({
        patch: { id, ...(Object.keys(set).length ? { set } : {}), ...(unset.length ? { unset } : {}) },
      });
    }
    if (title !== cur.title) {
      const productIds = await sanityQuery<string[]>(`*[_type == "product" && category == $old]._id`, { old: cur.title });
      mutations.push(...productIds.map((pid) => ({ patch: { id: pid, set: { category: title } } })));
    }
    if (mutations.length > 0) await sanityMutate(mutations);
  } catch (err) {
    console.error(err);
    return fail("Could not save the category. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  const { id } = await params;
  if (!ID.test(id)) return fail("Unknown category.", 404);
  try {
    const cats = await loadCategories();
    const cur = cats.find((c) => c._id === id);
    if (!cur) return fail("Unknown category.", 404);
    const used = (await productCategoryCounts()).get(cur.title) ?? 0;
    if (used > 0) {
      return fail(`${used} product${used === 1 ? "" : "s"} still use this category. Move or delete them first.`, 409);
    }
    await sanityMutate([{ delete: { id } }]);
  } catch (err) {
    console.error(err);
    return fail("Could not delete the category. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}
