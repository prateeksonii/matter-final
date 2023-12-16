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
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
  description: varchar("description", {
    length: 1000,
  }),
  createdBy: integer("created_by").references(() => users.id),
});

export const projectUsers = pgTable("project_users", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id").notNull(),
});

export const taskStatuses = pgTable("task_statuses", {
  id: serial("id").primaryKey(),
  name: varchar("name", {
    length: 50,
  }).notNull(),
});

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
  budget: integer("budget").default(0),
  statusId: integer("status_id")
    .default(1)
    .references(() => taskStatuses.id),
});

export const auditEntityTypes = pgTable("audit_entities", {
  id: serial("id").primaryKey(),
  name: varchar("name", {
    length: 50,
  }),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  entityId: integer("entity_id").notNull(),
  entityTypeId: integer("entity_type_id")
    .notNull()
    .references(() => auditEntityTypes.id),
  changes: varchar("changes"),
  date: timestamp("date").defaultNow(),
});
