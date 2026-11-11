import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityMutate } from "@/lib/sanityAdmin";
import { loadReviews, validReviewFields } from "@/lib/adminReviewStore";
import { refreshSite } from "@/lib/adminProducts";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  const { id } = await params;

  let body: { author?: unknown; quote?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  const fields = validReviewFields(body.author, body.quote);
  if (!fields) return fail("Please enter a name (up to 60 characters) and a review (up to 600 characters).", 400);

  try {
    const reviews = await loadReviews();
    if (!reviews.some((r) => r._id === id)) return fail("Unknown review.", 404);
    await sanityMutate([{ patch: { id, set: { author: fields.author, quote: fields.quote } } }]);
  } catch (err) {
    console.error(err);
    return fail("Could not save the review. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  const { id } = await params;
  try {
    const reviews = await loadReviews();
    if (!reviews.some((r) => r._id === id)) return fail("Unknown review.", 404);
    await sanityMutate([{ delete: { id } }]);
  } catch (err) {
    console.error(err);
    return fail("Could not delete the review. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}
