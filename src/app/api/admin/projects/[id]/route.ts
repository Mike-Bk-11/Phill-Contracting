import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects as projectsTable } from "@/lib/db/schema";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  const [row] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, numericId));

  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Remove the stored image, then the DB row.
  if (row.blobPathname) {
    try {
      await del(row.imageUrl);
    } catch {
      // Blob may already be gone; continue removing the DB row.
    }
  }

  await db.delete(projectsTable).where(eq(projectsTable.id, numericId));

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
