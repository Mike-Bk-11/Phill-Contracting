import { asc, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects as projectsTable } from "@/lib/db/schema";
import type { Project } from "@/data/projects";

/** Fetch all gallery projects from Neon, ordered for display. */
export async function getProjects(): Promise<Project[]> {
  const rows = await db
    .select()
    .from(projectsTable)
    .orderBy(asc(projectsTable.sortOrder), desc(projectsTable.createdAt));

  return rows.map((r) => ({
    id: String(r.id),
    title: r.title,
    category: r.category,
    image: r.imageUrl,
    location: r.location,
  }));
}
