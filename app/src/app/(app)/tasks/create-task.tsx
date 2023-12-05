"use client";

import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { createTask, searchTasks } from "./actions";
import { useRouter } from "next/navigation";
import { tasks } from "@/db/schema";
import Link from "next/link";

interface Props {
  projectId: number;
}

export default function CreateTaskInput(props: Props) {
  const [name, setName] = useState("");
  const [taskResults, setTaskResults] = useState<(typeof tasks.$inferSelect)[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const search = setTimeout(async () => {
      const tasks = await searchTasks(name, props.projectId);
      setTaskResults(tasks);
    }, 200);

    return () => clearTimeout(search);
  }, [name]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.code?.includes("Enter") && event.ctrlKey && name.length > 0) {
      await createTask(name, props.projectId);
      setName("");
      router.refresh();
    }
  };

  return (
    <>
      <input
        onChange={(e) => setName(e.currentTarget.value)}
        type="text"
        name="name"
        value={name}
        placeholder="Search tasks or create a new one"
        className="w-full rounded-md bg-shark-950 focus-within:bg-shark-900 placeholder:text-shark-300"
        onKeyDown={handleKeyDown}
      />
      <p className="text-sm prose prose-invert mt-1">
        Press <kbd className="">Ctrl</kbd> + <kbd>Enter</kbd> to create
      </p>
      <br />
      <div className="space-y-2">
        {taskResults.map((task) => (
          <Link
            href={`/tasks/${task.id}`}
            key={task.id}
            className="p-3 bg-shark-900 rounded-md block"
          >
            {task.name}
          </Link>
        ))}
      </div>
    </>
  );
}
