import type { GetServerSideProps, NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";

const HomePage: NextPage = () => {
  return (
    <main className="container mx-auto flex h-screen flex-col items-start justify-center gap-8">
      <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
        Your personal dashboard, <br />
        redefined.
      </h1>
      <button
        className="rounded bg-sky-600 px-8 py-4 text-lg font-medium"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn("github")}
      >
        Get Started
      </button>
    </main>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/dashboard",
      permanent: true,
    },
    props: {},
  };
};
