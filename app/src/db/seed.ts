import { sql } from "drizzle-orm";
import { db } from "./conn";
import { auditEntityTypes, taskStatuses } from "./schema";

function seed() {
  return Promise.all([
    db
      .insert(taskStatuses)
      .values([
        {
          id: 1,
          name: "Open",
        },
        {
          id: 2,
          name: "In progress",
        },
        {
          id: 3,
          name: "Done",
        },
      ])
      .onConflictDoUpdate({
        target: taskStatuses.id,
        set: {
          name: sql`EXCLUDED.name`,
        },
      }),

    db
      .insert(auditEntityTypes)
      .values([
        {
          id: 1,
          name: "Project",
        },
        {
          id: 2,
          name: "Task",
        },
      ])
      .onConflictDoUpdate({
        target: auditEntityTypes.id,
        set: {
          name: sql`EXCLUDED.name`,
        },
      }),
  ]);
}

seed().then(() => {
  console.log("done");
  process.exit(0);
});
