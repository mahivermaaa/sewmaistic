import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDb } from "@/lib/mongodb";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

// Emails the store owner a copy of the request. Never blocks or fails the submission.
async function notifyOwner(r: { name: string; email: string; wants: string }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return; // email not configured yet
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transporter.sendMail({
    from: `Sewmaistic Website <${user}>`,
    to: process.env.NOTIFY_EMAIL || "sewmaistic@gmail.com",
    replyTo: r.email,
    subject: `New customization request from ${r.name}`,
    text: `Name: ${r.name}\nEmail: ${r.email}\n\nRequest:\n${r.wants}`,
    html: `<h3>New customization request</h3><p><b>Name:</b> ${esc(r.name)}<br><b>Email:</b> ${esc(r.email)}</p><p><b>Request:</b><br>${esc(r.wants)}</p>`,
  });
}

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

  // Saved. Now email the owner (a failure here is logged but doesn't affect the customer).
  try {
    await notifyOwner({ name, email, wants });
  } catch (err) {
    console.error("Could not email the owner:", err);
  }

  return NextResponse.json({ ok: true });
}
