import { db } from "@/db/conn";
import {
  auditLogs,
  projectUsers,
  taskStatuses,
  tasks,
  users,
} from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import TaskInfo from "./TaskInfo";
import { AuditEntityTypes } from "@/enums";

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

const getTaskAuditLogs = async (taskId: number) => {
  return db
    .select()
    .from(auditLogs)
    .where(
      and(
        eq(auditLogs.entityId, taskId),
        eq(auditLogs.entityTypeId, AuditEntityTypes.Task)
      )
    )
    .orderBy(desc(auditLogs.date))
    .limit(5);
};

export default async function TaskDetailsPage(props: Props) {
  const task = (await getTaskById(props.params.id))[0];

  if (!task) {
    return <div>Invalid ID</div>;
  }

  const [users, taskStatuses, auditLogs] = await Promise.all([
    getUsers(task.projectId),
    getTaskStatuses(),
    getTaskAuditLogs(task.id),
  ]);

  return (
    <TaskInfo
      users={users}
      task={task}
      statuses={taskStatuses}
      auditLogs={auditLogs}
    />
  );
}
