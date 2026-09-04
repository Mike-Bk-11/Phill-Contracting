import { NextResponse } from "next/server";
import { verifyPassword, setAdminCookie, clearAdminCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password =
    typeof body === "object" && body !== null && "password" in body
      ? String((body as Record<string, unknown>).password ?? "")
      : "";

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}
