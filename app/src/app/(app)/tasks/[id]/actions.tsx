"use server";

import { db } from "@/db/conn";
import { auditLogs, tasks } from "@/db/schema";
import { AuditEntityTypes } from "@/enums";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateTask(task: typeof tasks.$inferSelect) {
  console.log(task);

  const currentTask = (
    await db.select().from(tasks).where(eq(tasks.id, task.id))
  )[0];

  const changes = [];

  type TaskKey = keyof typeof task;

  for (let [key, value] of Object.entries(task)) {
    const typedKey: TaskKey = key as TaskKey;
    if (typedKey === "createdAt") continue;
    if (value !== currentTask[typedKey]) {
      changes.push(typedKey);
    }
  }

  await db
    .update(tasks)
    .set({
      ...task,
    })
    .where(eq(tasks.id, task.id));

  await db.insert(auditLogs).values({
    entityId: task.id,
    entityTypeId: AuditEntityTypes.Task,
    changes: changes.join(", "),
  });

  revalidatePath(`/tasks/${task.id}`);
}
