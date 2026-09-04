import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

/** Allowed gallery categories. Keep in sync with the UI filter buttons. */
export const projectCategory = pgEnum("project_category", [
  "Kitchen",
  "Bathroom",
  "Exterior",
  "Flooring",
]);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: projectCategory("category").notNull(),
  location: text("location").notNull().default(""),
  // Public URL of the uploaded image (Vercel Blob).
  imageUrl: text("image_url").notNull(),
  // Blob pathname, kept so we can delete the file when a project is removed.
  blobPathname: text("blob_pathname"),
  // Lower numbers show first.
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ProjectRow = typeof projects.$inferSelect;
export type NewProjectRow = typeof projects.$inferInsert;
