import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityMutate } from "@/lib/sanityAdmin";
import { loadReviews, validReviewFields } from "@/lib/adminReviewStore";
import { refreshSite } from "@/lib/adminProducts";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function GET() {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);
  try {
    const reviews = await loadReviews();
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error(err);
    return fail("Could not load reviews from Sanity.", 502);
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return fail("Not signed in.", 401);
  if (!sanityConfigured()) return fail("Sanity isn't connected yet.", 500);

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
    const sortOrder = Math.max(-1, ...reviews.map((r) => r.sortOrder ?? 0)) + 1;
    await sanityMutate([{ create: { _type: "review", author: fields.author, quote: fields.quote, sortOrder } }]);
  } catch (err) {
    console.error(err);
    return fail("Could not save the review. Please try again.", 502);
  }
  refreshSite();
  return NextResponse.json({ ok: true });
}
