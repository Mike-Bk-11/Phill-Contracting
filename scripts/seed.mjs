// One-off seed: inserts the initial 6 gallery projects if the table is empty.
// These point at the static images already in /public/projects. New uploads
// added through /admin are stored in Vercel Blob instead.
// Run:  node scripts/seed.mjs
import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const seed = [
  { title: "Custom White Kitchen", category: "Kitchen", location: "Norwood, MA", image: "/projects/kitchen-1.png", sort: 1 },
  { title: "Luxury Master Bathroom", category: "Bathroom", location: "Boston, MA", image: "/projects/bathroom-1.png", sort: 2 },
  { title: "Open-Concept Kitchen & Island", category: "Kitchen", location: "Boston, MA", image: "/projects/kitchen-2.png", sort: 3 },
  { title: "Marble Walk-In Shower", category: "Bathroom", location: "Norwood, MA", image: "/projects/bathroom-2.png", sort: 4 },
  { title: "Modern Home Exterior", category: "Exterior", location: "Boston, MA", image: "/projects/exterior-1.jpg", sort: 5 },
  { title: "Hardwood Living Room", category: "Flooring", location: "Boston, MA", image: "/projects/living-room-1.png", sort: 6 },
];

const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM projects`;
if (count > 0) {
  console.log(`Table already has ${count} project(s); skipping seed.`);
  process.exit(0);
}

for (const p of seed) {
  await sql`
    INSERT INTO projects (title, category, location, image_url, sort_order)
    VALUES (${p.title}, ${p.category}, ${p.location}, ${p.image}, ${p.sort})
  `;
}

console.log(`Seeded ${seed.length} projects.`);
process.exit(0);
