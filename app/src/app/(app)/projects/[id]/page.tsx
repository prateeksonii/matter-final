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

const getProjectById = async (id: string) => {
  return db
    .select()
    .from(projects)
    .where(eq(projects.id, +id)).limit(1);
};

export default async function ProjectDetailsPage(props: Props) {
  const project = (await getProjectById(props.params.id))[0];
  if (!project) {
    return <div>Invalid ID</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p>{project.description}</p>
      <div className="p-2"></div>
      <CreateTaskInput projectId={project.id} />
    </div>
  );
}
