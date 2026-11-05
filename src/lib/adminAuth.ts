import crypto from "crypto";
import { cookies } from "next/headers";

// Simple single-user login. Credentials live in server env vars:
//   ADMIN_USERNAME, ADMIN_PASSWORD  (optional: ADMIN_SESSION_SECRET)
const COOKIE = "sm_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // stay signed in for 7 days

const secret = () => process.env.ADMIN_SESSION_SECRET || `${process.env.ADMIN_PASSWORD ?? ""}|sewmaistic-admin`;
const sign = (v: string) => crypto.createHmac("sha256", secret()).update(v).digest("hex");

export function adminConfigured() {
  return !!(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
}

function safeEqual(a: string, b: string) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkCredentials(username: string, password: string) {
  if (!adminConfigured()) return false;
  const u = safeEqual(username, process.env.ADMIN_USERNAME as string);
  const p = safeEqual(password, process.env.ADMIN_PASSWORD as string);
  return u && p;
}

export async function startSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig) return false;
  const expected = sign(exp);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(exp) > Date.now();
}
