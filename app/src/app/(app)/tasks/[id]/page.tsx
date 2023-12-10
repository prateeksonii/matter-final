import { db } from "@/db/conn";
import { tasks } from "@/db/schema";
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

export default async function TaskDetailsPage(props: Props) {
  const task = (await getTaskById(props.params.id))[0];
  if (!task) {
    return <div>Invalid ID</div>;
  }

  return (
    <TaskInfo task={task} />
  );
}
