import { db } from "@/db/conn";
import { projectUsers, projects, tasks, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getProjects = async () => {
  const { userId } = auth();
  const signedInUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId!));
  return db
    .select()
    .from(projects)
    .where(eq(projects.createdBy, signedInUser[0]?.id))
    .limit(5);
};

const getCounts = async () => {
  const { userId } = auth();
  const signedInUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId!));

  return Promise.all([
    db
      .select({
        projectsCount: sql<number>`cast(count(distinct ${projectUsers.projectId}) as integer)`,
        tasksCount: sql<number>`cast(count(distinct ${tasks.id}) as integer)`,
      })
      .from(projectUsers)
      .innerJoin(tasks, eq(tasks.projectId, projectUsers.projectId))
      .where(eq(projectUsers.userId, signedInUser[0].id)),
  ]);
};

export default async function Dashboard() {
  const projects = await getProjects();
  const [projectsCount] = await getCounts();

  return (
    <div>
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
      <div className="my-4 grid grid-cols-2 gap-8">
        <div className="bg-stone-900 p-8 rounded-lg">
          <h2>Total Projects</h2>
          <strong className="text-4xl font-extrabold">
            {projectsCount[0].projectsCount}
          </strong>
        </div>
        <div className="bg-stone-900 p-8 rounded-lg">
          <h2>Total Tasks</h2>
          <strong className="text-4xl font-extrabold">
            {projectsCount[0].tasksCount}
          </strong>
        </div>
      </div>
      <div className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold ">Recent Projects</h1>
          <Button asChild>
            <Link href="/projects/create" className="">
              Create
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="p-3 bg-stone-900 rounded-md"
            >
              {project.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
