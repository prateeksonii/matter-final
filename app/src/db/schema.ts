import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id"),
  name: varchar("name", {
    length: 100,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
});
