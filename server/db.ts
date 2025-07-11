
import * as dotenv from "dotenv";
dotenv.config();
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

let db: PostgresJsDatabase<typeof schema> | null = null;

if (process.env.DATABASE_URL) {
  const client = postgres(process.env.DATABASE_URL, { max: 1 });
  db = drizzle(client, { schema });
}

export { db };