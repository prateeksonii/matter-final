import { db } from "@/db/conn";
import { projects, tasks } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import CreateTaskInput from "../../tasks/create-task";

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
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      <div>
        <h1 className="text-3xl font-bold">{task.name}</h1>
        <p className="text-shark-200">
          {task.description ?? "No description provided"}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="p-8 bg-shark-900 rounded-xl grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-shark-300">Budget</span>
            <span className="text-lg font-bold">5</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-shark-300">Status</span>
            <span className="text-lg font-bold">Open</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-shark-300">Created by</span>
            <span className="text-lg font-bold">Prateek</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-shark-300">Assigned To</span>
            <span className="text-lg font-bold">Prateek</span>
          </div>
        </div>
        <div className="p-8 bg-shark-900 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Task assigned to Prateek</li>
            <li>Task created by Prateek Soni</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
