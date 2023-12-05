import { db } from "@/db/conn";
import { projects, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const getProjects = async () => {
  const { userId } = auth();
  const signedInUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId!));
  return db
    .select()
    .from(projects)
    .where(eq(projects.createdBy, signedInUser[0].id))
    .limit(5);
};

export default async function Dashboard() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-4xl font-extrabold">Dashboard</h1>
      <div className="my-4 grid grid-cols-2 gap-8">
        <div className="bg-shark-900 p-8 rounded-lg">
          <h2>Total Projects</h2>
          <strong className="text-4xl font-extrabold">5</strong>
        </div>
        <div className="bg-shark-900 p-8 rounded-lg">
          <h2>Total Tasks</h2>
          <strong className="text-4xl font-extrabold">100</strong>
        </div>
      </div>
      <div className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold ">Recent Projects</h1>
          <Link
            href="/projects/create"
            className="text-sm font-bold bg-tumbleweed-300 text-shark-950 px-4 py-2 rounded-md"
          >
            Create
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="p-3 bg-shark-900 rounded-md"
            >
              {project.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
