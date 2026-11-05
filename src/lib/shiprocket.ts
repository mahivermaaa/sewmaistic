// Server-only. Live shipping rates from Shiprocket.
// Needs (server env): SHIPROCKET_EMAIL, SHIPROCKET_PASSWORD (a Shiprocket API user), SHIPROCKET_PICKUP_PINCODE
// Optional: SHIPROCKET_DEFAULT_WEIGHT_KG (per item, default 0.5)
const BASE = "https://apiv2.shiprocket.in/v1/external";

// An error whose message is safe to show to the customer.
export class ShippingError extends Error {}

export interface ShippingQuote {
  shipping: number; // rupees
  courier?: string;
  days?: number;
}

export function shiprocketConfigured() {
  return !!(
    process.env.SHIPROCKET_EMAIL &&
    process.env.SHIPROCKET_PASSWORD &&
    /^\d{6}$/.test(process.env.SHIPROCKET_PICKUP_PINCODE ?? "")
  );
}

export function weightForItems(totalQuantity: number) {
  const unit = Number(process.env.SHIPROCKET_DEFAULT_WEIGHT_KG);
  return totalQuantity * (unit > 0 ? unit : 0.5);
}

// Shiprocket login tokens last ~10 days; we reuse one for 8.
let tokenCache: { token: string; exp: number } | null = null;

async function login(force = false): Promise<string> {
  if (!force && tokenCache && tokenCache.exp > Date.now()) return tokenCache.token;
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD }),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { token?: string };
  if (!res.ok || !json.token) throw new Error(`Shiprocket login failed (${res.status}). Check SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD.`);
  tokenCache = { token: json.token, exp: Date.now() + 8 * 24 * 3600 * 1000 };
  return json.token;
}

const quoteCache = new Map<string, { q: ShippingQuote; exp: number }>();

interface Courier {
  courier_name?: string;
  rate?: number | string;
  freight_charge?: number | string;
  estimated_delivery_days?: number | string;
}

export async function getShippingQuote(pincode: string, weightKg: number): Promise<ShippingQuote> {
  // Couriers price in 0.5 kg steps.
  const weight = Math.max(0.5, Math.ceil(weightKg * 2) / 2);
  const key = `${pincode}|${weight}`;
  const hit = quoteCache.get(key);
  if (hit && hit.exp > Date.now()) return hit.q;

  const url =
    `${BASE}/courier/serviceability/?pickup_postcode=${process.env.SHIPROCKET_PICKUP_PINCODE}` +
    `&delivery_postcode=${pincode}&weight=${weight}&cod=0`;
  const call = async (token: string) =>
    fetch(url, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, cache: "no-store" });

  let res = await call(await login());
  if (res.status === 401) res = await call(await login(true));
  const json = (await res.json().catch(() => ({}))) as {
    status?: number;
    message?: string;
    data?: { available_courier_companies?: Courier[] };
  };

  const couriers = json.data?.available_courier_companies;
  if (res.status === 404 || json.status === 404 || (res.ok && Array.isArray(couriers) && couriers.length === 0)) {
    throw new ShippingError("Sorry, we can't deliver to this pincode yet. Please check it or contact us.");
  }
  if (!res.ok || !Array.isArray(couriers)) {
    throw new Error(`Shiprocket serviceability failed (${res.status}): ${JSON.stringify(json).slice(0, 300)}`);
  }

  // Cheapest courier that serves this pincode.
  const priced = couriers
    .map((c) => ({ c, rate: Number(c.rate ?? c.freight_charge) }))
    .filter((x) => Number.isFinite(x.rate) && x.rate > 0)
    .sort((a, b) => a.rate - b.rate);
  if (priced.length === 0) {
    throw new Error(`Shiprocket returned no usable rates: ${JSON.stringify(json).slice(0, 300)}`);
  }
  const best = priced[0];
  const days = Number(best.c.estimated_delivery_days);
  const q: ShippingQuote = {
    shipping: Math.ceil(best.rate),
    courier: best.c.courier_name,
    days: Number.isFinite(days) && days > 0 ? days : undefined,
  };
  quoteCache.set(key, { q, exp: Date.now() + 10 * 60 * 1000 });
  return q;
}
