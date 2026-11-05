import { NextResponse } from "next/server";
import { getProductById } from "@/lib/catalogue";
import { getDb } from "@/lib/mongodb";

// Shipping fee in rupees. 0 = free tracked shipping across India.
const SHIPPING_FEE = 0;

export async function POST(req: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 500 });
  }

  let body: { items?: { id?: string; quantity?: number }[]; customer?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  // Prices always come from our catalogue, never from the browser.
  const lines = [];
  let subtotal = 0;
  for (const it of items) {
    const product = it.id ? await getProductById(it.id) : undefined;
    const quantity = Number(it.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: "A product in your bag is invalid." }, { status: 400 });
    }
    if (product.outOfStock) {
      return NextResponse.json({ error: `${product.title} is out of stock.` }, { status: 400 });
    }
    const amount = product.price * quantity;
    subtotal += amount;
    lines.push({ id: product.id, title: product.title, price: product.price, quantity, amount });
  }

  const total = subtotal + SHIPPING_FEE;
  const c = body.customer ?? {};

  const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
    },
    body: JSON.stringify({
      amount: Math.round(total * 100), // paise
      currency: "INR",
      receipt: `SM-${Date.now()}`,
      notes: {
        name: String(c.name ?? "").slice(0, 100),
        phone: String(c.phone ?? "").slice(0, 20),
        email: String(c.email ?? "").slice(0, 100),
        address: `${c.address ?? ""}, ${c.city ?? ""}, ${c.state ?? ""} ${c.pincode ?? ""}`.slice(0, 250),
      },
    }),
  });

  if (!rzpRes.ok) {
    return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 502 });
  }
  const order = await rzpRes.json();

  // Save the order (status "pending" until the payment is verified).
  try {
    const db = await getDb();
    await db?.collection("orders").insertOne({
      razorpayOrderId: order.id,
      receipt: order.receipt,
      status: "pending",
      customer: {
        name: String(c.name ?? "").slice(0, 100),
        email: String(c.email ?? "").slice(0, 100),
        phone: String(c.phone ?? "").slice(0, 20),
        address: String(c.address ?? "").slice(0, 250),
        city: String(c.city ?? "").slice(0, 100),
        state: String(c.state ?? "").slice(0, 100),
        pincode: String(c.pincode ?? "").slice(0, 10),
      },
      items: lines,
      subtotal,
      shipping: SHIPPING_FEE,
      total,
      currency: "INR",
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Could not save order to MongoDB:", err);
  }

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
    lines,
    subtotal,
    shipping: SHIPPING_FEE,
    total,
  });
}
