import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ ok: false, error: "Payments are not configured yet." }, { status: 500 });
  }

  let body: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(razorpay_signature);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (ok) {
    try {
      const db = await getDb();
      await db?.collection("orders").updateOne(
        { razorpayOrderId: razorpay_order_id },
        { $set: { status: "paid", razorpayPaymentId: razorpay_payment_id, paidAt: new Date() } }
      );
    } catch (err) {
      console.error("Could not mark order as paid in MongoDB:", err);
    }
  }

  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
