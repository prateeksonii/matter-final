"use client";

import { tasks } from "@/db/schema";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { updateTask } from "./actions";

interface TaskInfoProps {
  task: typeof tasks.$inferSelect;
}

export default function TaskInfo(props: TaskInfoProps) {
  const taskRef = useRef(props.task);
  const [task, setTask] = useState(props.task);
  const [status, setStatus] = useState<"&nbsp;" | "saving" | "saved">("&nbsp;");

  const handleChange = (event: ChangeEvent, key: keyof typeof task) => {
    event.preventDefault();
    setTask({
      ...task,
      [key]: (event.target as HTMLInputElement).value,
    });
  };

  useEffect(() => {
    const update = setTimeout(async () => {
      if (JSON.stringify(task) === JSON.stringify(taskRef.current)) {
        return;
      }
      setStatus("saving");
      await updateTask(task);
      taskRef.current = task;
      setStatus("saved");
    }, 1000);

    return () => clearTimeout(update);
  }, [task]);

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <div className="flex flex-col">
          <div
            className="ml-auto text-sm"
            dangerouslySetInnerHTML={{ __html: status }}
          ></div>
          <input
            name="name"
            className="bg-transparent rounded-md focus-within:bg-shark-900 text-xl border-none px-2 py-1 text-shark-50 font-bold"
            value={task.name ?? ""}
            onChange={(e) => handleChange(e, "name")}
          />
          <textarea
            className="bg-transparent rounded-md focus-within:bg-shark-900 text-md mt-3 border-none p-2 text-shark-200"
            value={task.description ?? ""}
            placeholder="No description provided"
            onChange={(e) => handleChange(e, "description")}
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="p-8 bg-shark-900 rounded-xl grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-shark-300">Budget</span>
              <input
                type="number"
                className="bg-transparent border-none p-0 text-shark-50 text-lg font-bold"
                onChange={(e) => handleChange(e, "budget")}
                value={task.budget ?? 0}
              />
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
    </>
  );
}
