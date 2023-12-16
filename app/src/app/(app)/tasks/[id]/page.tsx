import { db } from "@/db/conn";
import { projectUsers, taskStatuses, tasks, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import TaskInfo from "./TaskInfo";

interface Props {
  params: {
    id: string;
  };
}

const getTaskById = async (id: string) => {
  return db.select().from(tasks).where(eq(tasks.id, +id)).limit(1);
};

const getTaskStatuses = async () => {
  return db.select().from(taskStatuses);
};

const getUsers = async (projectId: number) => {
  return db
    .select()
    .from(projectUsers)
    .innerJoin(users, eq(projectUsers.userId, users.id))
    .where(eq(projectUsers.projectId, projectId));
};

export default async function TaskDetailsPage(props: Props) {
  const task = (await getTaskById(props.params.id))[0];
  const users = await getUsers(task.projectId);
  const taskStatuses = await getTaskStatuses();

  if (!task) {
    return <div>Invalid ID</div>;
  }

  return <TaskInfo users={users} task={task} statuses={taskStatuses} />;
}
