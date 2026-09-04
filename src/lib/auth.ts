import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to .env.local and to your Vercel env vars."
    );
  }
  return pw;
}

/** Token derived from the password — safe to store in a cookie. */
function sessionToken(): string {
  return createHmac("sha256", getSecret()).update("phill-admin").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** True if the submitted password matches ADMIN_PASSWORD. */
export function verifyPassword(password: string): boolean {
  return safeEqual(password, getSecret());
}

/** Set the admin session cookie after a successful login. */
export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

/** Clear the admin session cookie (logout). */
export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/** True if the current request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, sessionToken());
}
