import { NextResponse } from "next/server";
import { getShippingQuote, shiprocketConfigured, ShippingError, weightForItems } from "@/lib/shiprocket";

// Instant shipping estimate for the checkout form. (The real charge is re-calculated when the order is created.)
export async function POST(req: Request) {
  let body: { pincode?: string; items?: { quantity?: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const pincode = String(body.pincode ?? "");
  if (!/^\d{6}$/.test(pincode)) return NextResponse.json({ error: "Please enter a valid 6-digit pincode." }, { status: 400 });

  const items = Array.isArray(body.items) ? body.items : [];
  let qty = 0;
  for (const it of items) {
    const n = Number(it.quantity);
    if (!Number.isInteger(n) || n < 1 || n > 20) return NextResponse.json({ error: "Invalid items." }, { status: 400 });
    qty += n;
  }
  if (items.length === 0 || items.length > 30) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  // Not set up yet -> shipping stays free, exactly like before.
  if (!shiprocketConfigured()) return NextResponse.json({ shipping: 0, configured: false });

  try {
    const q = await getShippingQuote(pincode, weightForItems(qty));
    return NextResponse.json({ ...q, configured: true });
  } catch (err) {
    if (err instanceof ShippingError) return NextResponse.json({ error: err.message }, { status: 422 });
    console.error("Shipping quote failed:", err);
    return NextResponse.json({ error: "Could not calculate shipping right now. Please try again in a moment." }, { status: 502 });
  }
}
