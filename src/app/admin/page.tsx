import { asc, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects as projectsTable } from "@/lib/db/schema";
import { isAdmin } from "@/lib/auth";
import { LoginForm, AdminDashboard } from "./admin-client";

// Never cache — always reflect the current login state and project list.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <LoginForm />;
  }

  const rows = await db
    .select()
    .from(projectsTable)
    .orderBy(asc(projectsTable.sortOrder), desc(projectsTable.createdAt));

  const items = rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    location: r.location,
    imageUrl: r.imageUrl,
  }));

  return <AdminDashboard initialProjects={items} />;
}
