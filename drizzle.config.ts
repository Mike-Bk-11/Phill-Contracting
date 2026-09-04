import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load local env vars (Next.js uses .env.local; fall back to .env).
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
