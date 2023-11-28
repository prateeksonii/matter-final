import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./drizzle",
} satisfies Config;
