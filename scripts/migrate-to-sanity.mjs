// One-time: copies the products in src/data/products-seed.json (with their photos)
// into Sanity. Run ONCE, from the project root:
//   node --env-file=.env.local scripts/migrate-to-sanity.mjs
// Needs in .env.local:
//   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
// (create the token at sanity.io/manage -> API -> Tokens -> "Editor"; delete it afterwards)
// WARNING: re-running overwrites edits the client has made to these products.
import { readFile } from "node:fs/promises";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const API = `https://${projectId}.api.sanity.io/v2025-01-01`;
const products = JSON.parse(await readFile("src/data/products-seed.json", "utf8"));
const assetCache = new Map();

const mime = (f) => ({ ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" }[path.extname(f).toLowerCase()] || "application/octet-stream");

async function uploadImage(publicPath) {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath);
  const file = path.join("public", publicPath);
  const body = await readFile(file);
  const res = await fetch(`${API}/assets/images/${dataset}?filename=${encodeURIComponent(path.basename(file))}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": mime(file) },
    body,
  });
  if (!res.ok) throw new Error(`Upload failed for ${file}: ${res.status} ${await res.text()}`);
  const id = (await res.json()).document._id;
  assetCache.set(publicPath, id);
  return id;
}

let done = 0;
for (const p of products) {
  const photos = p.images?.length ? p.images : [p.image];
  const images = [];
  for (const [i, src] of photos.entries()) {
    const ref = await uploadImage(src);
    images.push({ _type: "image", _key: `img${i}`, asset: { _type: "reference", _ref: ref } });
  }
  const doc = {
    _id: `product-${p.id}`,
    _type: "product",
    title: p.title,
    slug: { _type: "slug", current: p.id },
    price: p.price,
    images,
    category: p.category,
    description: p.description || "",
    outOfStock: !!p.outOfStock,
    isNewArrival: !!p.isNewArrival,
    isFanFavourite: !!p.isFanFavourite,
    sortOrder: p.sortOrder,
  };
  const res = await fetch(`${API}/data/mutate/${dataset}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
  });
  if (!res.ok) throw new Error(`Saving ${p.id} failed: ${res.status} ${await res.text()}`);
  done++;
  console.log(`(${done}/${products.length}) ${p.title}`);
}
console.log("Done. Open the dashboard to see your products.");
