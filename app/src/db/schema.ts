import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id").notNull().unique(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  description: varchar("description", {
    length: 1000,
  }),
  createdBy: integer("created_by").references(() => users.id),
});

export const taskStatuses = pgTable('task_statuses', {
  id: serial('id').primaryKey(),
  name: varchar('name', {
    length: 50
  }).notNull()
})

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  description: varchar("description", {
    length: 500,
  }),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  assignedTo: integer("assigned_to").references(() => users.id),
  budget: integer('budget').default(0),
  statusId: integer('status_id').references(() => taskStatuses.id)
});
