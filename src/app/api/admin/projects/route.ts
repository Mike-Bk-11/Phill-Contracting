import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { desc, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects as projectsTable } from "@/lib/db/schema";
import { projectCategories, type ProjectCategory } from "@/data/projects";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const rows = await db
    .select()
    .from(projectsTable)
    .orderBy(asc(projectsTable.sortOrder), desc(projectsTable.createdAt));
  return NextResponse.json({ projects: rows });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const title = String(form.get("title") ?? "").trim();
  const category = String(form.get("category") ?? "").trim();
  const location = String(form.get("location") ?? "").trim();
  const file = form.get("image");

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!projectCategories.includes(category as ProjectCategory)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 10 MB." }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();

  // The Blob store was created with a non-standard env prefix, so accept either
  // the standard name or the prefixed one Vercel generated.
  const blobToken =
    process.env.BLOB_READ_WRITE_TOKEN ?? process.env._READ_WRITE_TOKEN;
  if (!blobToken) {
    return NextResponse.json(
      { error: "Image storage is not configured (missing Blob token)." },
      { status: 500 }
    );
  }

  const blob = await put(`projects/${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
    token: blobToken,
  });

  const [row] = await db
    .insert(projectsTable)
    .values({
      title,
      category: category as ProjectCategory,
      location,
      imageUrl: blob.url,
      blobPathname: blob.pathname,
    })
    .returning();

  revalidatePath("/");
  return NextResponse.json({ ok: true, project: row });
}
