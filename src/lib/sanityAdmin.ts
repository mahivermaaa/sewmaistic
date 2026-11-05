// Server-only helpers that talk to Sanity with the write token.
// Never import this file from a client component.
const API_VERSION = "2025-01-01";

const projectId = () => process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = () => process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = () => process.env.SANITY_API_WRITE_TOKEN;

export function sanityConfigured() {
  return !!(projectId() && token());
}

const base = () => `https://${projectId()}.api.sanity.io/v${API_VERSION}`;
const auth = () => ({ Authorization: `Bearer ${token()}` });

export async function sanityQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const p = Object.entries(params)
    .map(([k, v]) => `&$${k}=${encodeURIComponent(JSON.stringify(v))}`)
    .join("");
  const res = await fetch(
    `${base()}/data/query/${dataset()}?perspective=published&query=${encodeURIComponent(query)}${p}`,
    { headers: auth(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { result: T }).result;
}

export async function sanityMutate(mutations: unknown[]) {
  const res = await fetch(`${base()}/data/mutate/${dataset()}?visibility=sync`, {
    method: "POST",
    headers: { ...auth(), "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sanity save failed: ${res.status} ${await res.text()}`);
}

export async function sanityUploadImage(body: ArrayBuffer, contentType: string) {
  const res = await fetch(`${base()}/assets/images/${dataset()}?filename=product.jpg`, {
    method: "POST",
    headers: { ...auth(), "Content-Type": contentType },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sanity upload failed: ${res.status} ${await res.text()}`);
  const doc = ((await res.json()) as { document: { _id: string; url: string } }).document;
  return { ref: doc._id, url: doc.url };
}
