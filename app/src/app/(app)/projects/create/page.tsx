import { db } from "@/db/conn";
import { projects, users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default function CreateProjectPage() {
  const createProject = async (formData: FormData) => {
    "use server";

    const { userId } = auth();
    const signedInUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!));

    const createdProject = await db
      .insert(projects)
      .values({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        createdBy: signedInUser[0].id,
      })
      .returning({
        id: projects.id,
      });

    redirect(`/projects/${createdProject[0].id}`);
  };

  return (
    <div className="grid place-items-center flex-1">
      <div className="grid grid-cols-2 w-full gap-8">
        <div className="bg-shark-900 p-8 rounded-xl max-w-xl">
          <h2 className="font-extrabold text-2xl mb-4">Create new project</h2>
          <form
            method="post"
            action={createProject}
            className="flex flex-col gap-3"
          >
            <label className="text-sm flex flex-col" htmlFor="name">
              Name
              <input
                name="name"
                className="bg-shark-900 rounded-md focus-within:bg-shark-700"
                required
              />
            </label>
            <label className="text-sm flex flex-col" htmlFor="description">
              Description
              <textarea
                name="description"
                className="bg-shark-900 rounded-md focus-within:bg-shark-700"
              />
            </label>
            <button className="mt-2 w-full p-2 bg-tumbleweed-300 text-shark-950 font-bold rounded-md hover:bg-tumbleweed-500 transition-all">
              Continue
            </button>
          </form>
        </div>
        <div className="text-2xl leading-relaxed space-y-8 self-center">
          <p>"Creating project is the first step towards finishing it"</p>
        </div>
      </div>
    </div>
  );
}
