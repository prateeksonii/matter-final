import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
  Redirect,
} from "next";
import Link from "next/link";
import Nav from "../../components/Nav";
import { getServerAuthSession } from "../../server/auth";

const DashboardPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Nav user={props.user} />
      <section className="h-[calc(100vh-4rem)]">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          Your recent projects will show up here.
          <br />
          <Link
            href="/dashboard/projects/new"
            className="rounded bg-sky-600 py-1 px-2 text-sm"
          >
            Create New
          </Link>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;

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
