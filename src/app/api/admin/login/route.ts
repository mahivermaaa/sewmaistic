import { NextResponse } from "next/server";
import { adminConfigured, checkCredentials, startSession } from "@/lib/adminAuth";

// Basic brute-force guard: 5 wrong attempts -> locked for 15 minutes (per server instance).
const WINDOW = 15 * 60 * 1000;
const fails = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin login isn't set up yet. Add ADMIN_USERNAME and ADMIN_PASSWORD to the server settings." }, { status: 500 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const rec = fails.get(ip);
  const active = rec && Date.now() - rec.t < WINDOW ? rec : undefined;
  if (active && active.n >= 5) {
    return NextResponse.json({ error: "Too many attempts. Please wait 15 minutes and try again." }, { status: 429 });
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkCredentials(String(body.username ?? ""), String(body.password ?? ""))) {
    fails.set(ip, { n: (active?.n ?? 0) + 1, t: Date.now() });
    return NextResponse.json({ error: "Wrong ID or password." }, { status: 401 });
  }
  fails.delete(ip);
  await startSession();
  return NextResponse.json({ ok: true });
}
