import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { sanityConfigured, sanityUploadImage } from "@/lib/sanityAdmin";

// Receives ONE photo (already shrunk by the admin page) and stores it in Sanity.
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!sanityConfigured()) return NextResponse.json({ error: "Sanity isn't connected yet." }, { status: 500 });

  const type = (req.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
    return NextResponse.json({ error: "Only JPG, PNG or WebP photos are allowed." }, { status: 400 });
  }
  const buf = await req.arrayBuffer();
  if (buf.byteLength === 0 || buf.byteLength > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Photo is too large (max 4 MB)." }, { status: 413 });
  }
  try {
    return NextResponse.json(await sanityUploadImage(buf, type));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not upload the photo. Please try again." }, { status: 502 });
  }
}
