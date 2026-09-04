/**
 * Portfolio / gallery types and category list.
 * The actual project records now live in Neon Postgres and are fetched at
 * runtime — see src/lib/projects.ts and the /admin upload page.
 */
export type ProjectCategory = "Kitchen" | "Bathroom" | "Exterior" | "Flooring";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  location: string;
};

export const projectCategories: ProjectCategory[] = [
  "Kitchen",
  "Bathroom",
  "Exterior",
  "Flooring",
];
