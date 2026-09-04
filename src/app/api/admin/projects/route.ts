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
  const files = form
    .getAll("image")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!projectCategories.includes(category as ProjectCategory)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }
  if (files.length === 0) {
    return NextResponse.json(
      { error: "At least one image is required." },
      { status: 400 }
    );
  }
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: `"${file.name}" is not an image.` },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" is larger than 10 MB.` },
        { status: 400 }
      );
    }
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image storage is not configured (missing Blob token)." },
      { status: 500 }
    );
  }

  // Upload every file and create one gallery entry per photo, all sharing the
  // same title, category, and location.
  const created = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    const blob = await put(`projects/${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const [row] = await db
      .insert(projectsTable)
      .values({
        title,
        category: category as ProjectCategory,
        location,
        imageUrl: blob.url,
        blobPathname: blob.pathname,
        sortOrder: i,
      })
      .returning();
    created.push(row);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true, count: created.length, projects: created });
}
