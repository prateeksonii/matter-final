"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  auditLogs,
  projectUsers,
  taskStatuses,
  tasks,
  users,
} from "@/db/schema";
import { useEffect, useRef, useState } from "react";
import { updateTask } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TaskInfoProps {
  task: typeof tasks.$inferSelect;
  statuses: (typeof taskStatuses.$inferSelect)[];
  users: {
    project_users: typeof projectUsers.$inferSelect;
    users: typeof users.$inferSelect;
  }[];
  auditLogs: (typeof auditLogs.$inferSelect)[];
}

export default function TaskInfo(props: TaskInfoProps) {
  const taskRef = useRef(props.task);
  const [task, setTask] = useState(props.task);
  const [saveStatus, setSaveStatus] = useState<"&nbsp;" | "saving" | "saved">(
    "&nbsp;"
  );

  const users = props.users.map((user) => ({
    value: user.users.id.toString(),
    label: `${user.users.firstName} ${user.users.lastName}`,
  }));

  const handleChange = (value: string | number, key: keyof typeof task) => {
    setTask({
      ...task,
      [key]: value,
    });
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.task.assignedTo?.toString() ?? "");

  useEffect(() => {
    const update = setTimeout(async () => {
      if (JSON.stringify(task) === JSON.stringify(taskRef.current)) {
        return;
      }
      setSaveStatus("saving");
      await updateTask(task);
      taskRef.current = task;
      setSaveStatus("saved");
    }, 1000);

    return () => clearTimeout(update);
  }, [task]);

  const createdByUser = props.users.find(
    (u) => u.users.id === task.createdBy
  )?.users;

  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>
              <input
                name="name"
                className="bg-transparent w-full rounded-md focus-within:bg-stone-900 text-xl border-none px-2 py-1 text-stone-50 font-bold"
                value={task.name ?? ""}
                onChange={(e) => handleChange((e.target as any).value, "name")}
              />
            </CardTitle>
            <CardDescription>
              <textarea
                className="bg-transparent rounded-md focus-within:bg-stone-900 w-full text-md mt-3 border-none p-2 text-stone-200"
                value={task.description ?? ""}
                placeholder="No description provided"
                onBlur={(e) =>
                  handleChange((e.target as any).value, "description")
                }
              />
            </CardDescription>
          </CardHeader>
          <div
            className="ml-auto text-sm"
            dangerouslySetInnerHTML={{ __html: saveStatus }}
          ></div>
        </Card>
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label className="text-xs" htmlFor="budget">
                  Budget
                </Label>
                <Input
                  className="appearance-none [-moz-appearance:textfield]"
                  type="number"
                  id="budget"
                  onChange={(e) =>
                    handleChange(+(e.target as any).value, "budget")
                  }
                  value={task.budget ?? 0}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-xs">Status</Label>
                <Select
                  value={task.statusId?.toString()}
                  onValueChange={(v) => handleChange(+v, "statusId")}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {props.statuses.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="text-xs">Created by</Label>
                <Input
                  disabled
                  defaultValue={`${createdByUser?.firstName} ${createdByUser?.lastName}`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-stone-300">Assigned To</span>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className=" justify-between"
                    >
                      {value
                        ? users.find((user) => user.value === value)?.label
                        : "Select users..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command
                      filter={(value, search) => {
                        if (
                          users
                            .find((user) => user.value === value)
                            ?.label.toLowerCase()
                            .includes(search.toLowerCase())
                        )
                          return 1;
                        return 0;
                      }}
                    >
                      <CommandInput placeholder="Select users..." />
                      <CommandEmpty>No user set</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            key={user.value}
                            value={user.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
                              handleChange(+currentValue, "assignedTo");
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === user.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {user.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              {props.auditLogs.length > 0 ? (
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  {props.auditLogs.map((log) => (
                    <li key={log.id} className="text-sm">
                      <strong className="capitalize">{log.changes}</strong>{" "}
                      updated at{" "}
                      {Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(log.date!)}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No logs yet</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
