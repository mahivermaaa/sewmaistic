import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// Saves a "Want Customizations?" request to the `customizations` collection.
export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; wants?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 150);
  const wants = String(body.wants ?? "").trim().slice(0, 2000);

  if (!name || !wants || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in all three fields correctly." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Could not save your request right now. Please try again." }, { status: 503 });
  }

  try {
    await db.collection("customizations").insertOne({
      name,
      email,
      wants,
      status: "new",
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Could not save customization request:", err);
    return NextResponse.json({ error: "Could not save your request right now. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
