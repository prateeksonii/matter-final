import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";

const ProjectPage: NextPage = () => {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { isLoading, data: project } = api.projects.getBySlug.useQuery({
    slug,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="p-8">
      <small>Project name</small>
      <h1 className="text-xl font-bold">{project?.name}</h1>

      <section className="py-8">
        <table className="table w-full table-auto">
          <thead className="text-left">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Created On</th>
            </tr>
          </thead>
        </table>
      </section>
    </section>
  );
};

export default ProjectPage;
