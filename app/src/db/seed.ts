import { sql } from "drizzle-orm";
import { db } from "./conn";
import { taskStatuses } from "./schema";

function seed() {
  return db
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
    });
}

seed().then(() => {
  console.log("done");
  process.exit(0);
});
