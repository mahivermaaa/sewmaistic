import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/mongodb";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Emails the store owner whenever someone joins the "Be an Insider" list. Never blocks or fails the submission.
async function notifyOwner(email: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return; // email not configured yet
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({
    from: `Sewmaistic Website <${user}>`,
    to: process.env.NOTIFY_EMAIL || "sewmaistic@gmail.com",
    subject: `New "Be an Insider" sign-up`,
    text: `A new visitor joined the insider list:\n${email}`,
    html: `<h3>New "Be an Insider" sign-up</h3><p>${esc(email)}</p>`,
  });
}

// Saves an email address submitted through the "Be an Insider" popup to the `insiders` collection.
export async function POST(req: Request) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 150);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Could not save your email right now. Please try again." }, { status: 503 });
  }

  try {
    await db.collection("insiders").updateOne(
      { email },
      { $setOnInsert: { email, createdAt: new Date() } },
      { upsert: true }
    );
  } catch (err) {
    console.error("Could not save insider sign-up:", err);
    return NextResponse.json({ error: "Could not save your email right now. Please try again." }, { status: 500 });
  }

  // Saved. Now email the owner (a failure here is logged but doesn't affect the visitor).
  try {
    await notifyOwner(email);
  } catch (err) {
    console.error("Could not email the owner:", err);
  }

  return NextResponse.json({ ok: true });
}
