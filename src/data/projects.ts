/**
 * Portfolio / gallery projects.
 * TODO: Replace the Unsplash placeholder images with real photos of completed
 * jobs (place them in /public/projects and update the `image` paths, e.g.
 * "/projects/kitchen-1.jpg").
 */
export type ProjectCategory =
  | "Kitchen"
  | "Bathroom"
  | "Basement Finishing"
  | "Exterior"
  | "Flooring";

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
  "Basement Finishing",
  "Exterior",
  "Flooring",
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Modern Farmhouse Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
    location: "Boston, MA",
  },
  {
    id: "p2",
    title: "Spa-Style Master Bath",
    category: "Bathroom",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
    location: "Cambridge, MA",
  },
  {
    id: "p3",
    title: "Two-Story Family Addition",
    category: "Basement Finishing",
    image:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=1200&q=80",
    location: "Newton, MA",
  },
  {
    id: "p4",
    title: "Craftsman Exterior Refresh",
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    location: "Boston, MA",
  },
  {
    id: "p5",
    title: "Open-Concept Kitchen & Dining",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    location: "Somerville, MA",
  },
  {
    id: "p6",
    title: "Hardwood Living Room",
    category: "Flooring",
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
    location: "Boston, MA",
  },
];
