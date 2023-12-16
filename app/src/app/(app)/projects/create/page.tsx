import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db/conn";
import { projectUsers, projects, users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";
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

    await db.insert(projectUsers).values({
      projectId: createdProject[0].id,
      userId: signedInUser[0].id,
    });

    redirect(`/projects/${createdProject[0].id}`);
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          You can create upto 5 projects for free
        </CardDescription>
      </CardHeader>
      <form method="post" action={createProject}>
        <CardContent className="flex flex-col gap-3">
          <Input name="name" required placeholder="Name" />
          <Textarea
            name="description"
            placeholder="Briefly describe your project (optional)"
            rows={8}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button>Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
