/* eslint-disable @typescript-eslint/no-misused-promises */
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
  Redirect,
} from "next";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Nav from "../../../components/Nav";
import { getServerAuthSession } from "../../../server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IProjectValidator } from "../../../validators/projects.validators";
import { newProjectValidator } from "../../../validators/projects.validators";
import { api } from "../../../utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const NewProjectPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { register, handleSubmit } = useForm<IProjectValidator>({
    resolver: zodResolver(newProjectValidator),
  });

  const { mutateAsync } = api.projects.create.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IProjectValidator> = async (values) => {
    try {
      const data = await mutateAsync(values);
      toast.success("Project created");
      await router.push(`/dashboard/projects/${data.slug}`);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Nav user={props.user} />
      <div className="grid h-[calc(100vh-4rem)] grid-cols-2 gap-8">
        <section className="mx-auto flex h-full w-2/3 flex-col p-8">
          <h1 className="text-4xl font-bold">Create a project</h1>

          <form
            className="flex flex-1 flex-col gap-3 py-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name")}
                className="rounded bg-zinc-900"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                className="h-full rounded bg-zinc-900"
                rows={8}
              />
            </div>
            <button type="submit" className="w-full rounded bg-sky-600 py-2">
              Create
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default NewProjectPage;

export const getServerSideProps: GetServerSideProps<{
  redirect?: Redirect;
  user: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}> = async (context) => {
  const session = await getServerAuthSession(context);

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
      props: {},
    };
  }

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user: session.user!,
    },
  };
};
