import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { desc, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects as projectsTable } from "@/lib/db/schema";
import { projectCategories, type ProjectCategory } from "@/data/projects";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

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

type UploadedImage = { url: string; pathname: string };

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: {
    title?: unknown;
    category?: unknown;
    location?: unknown;
    images?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const title = String(payload.title ?? "").trim();
  const category = String(payload.category ?? "").trim();
  const location = String(payload.location ?? "").trim();
  const images: UploadedImage[] = Array.isArray(payload.images)
    ? payload.images
        .filter(
          (img): img is UploadedImage =>
            typeof img === "object" &&
            img !== null &&
            typeof (img as UploadedImage).url === "string"
        )
        .map((img) => ({ url: img.url, pathname: img.pathname }))
    : [];

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!projectCategories.includes(category as ProjectCategory)) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }
  if (images.length === 0) {
    return NextResponse.json(
      { error: "At least one image is required." },
      { status: 400 }
    );
  }

  // One gallery entry per uploaded photo, all sharing title/category/location.
  const created = [];
  for (let i = 0; i < images.length; i++) {
    const [row] = await db
      .insert(projectsTable)
      .values({
        title,
        category: category as ProjectCategory,
        location,
        imageUrl: images[i].url,
        blobPathname: images[i].pathname,
        sortOrder: i,
      })
      .returning();
    created.push(row);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true, count: created.length, projects: created });
}
