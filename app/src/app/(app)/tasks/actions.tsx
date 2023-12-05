"use server";

import { db } from "@/db/conn";
import { tasks, users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { desc, eq, ilike, like } from "drizzle-orm";

export async function createTask(name: string, projectId: number) {
  const authUser = auth();
  const user = (
    await db.select().from(users).where(eq(users.clerkId, authUser.userId!))
  )[0];

  return db
    .insert(tasks)
    .values({
      createdBy: user.id,
      name,
      projectId,
    })
    .returning();
}

export async function searchTasks(name: string, projectId: number) {
  return db
    .select()
    .from(tasks)
    .where(ilike(tasks.name, `%${name}%`))
    .orderBy(desc(tasks.createdAt))
    .limit(5);
}
