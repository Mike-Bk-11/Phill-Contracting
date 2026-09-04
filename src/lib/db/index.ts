import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add your Neon connection string to .env.local (and to Vercel project env vars)."
  );
}

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
