"use server";

import { db } from "@/db/conn";
import { tasks } from "@/db/schema";

export async function updateTask(task: typeof tasks.$inferSelect) {
  return db.update(tasks).set({
    ...task,
  });
}
