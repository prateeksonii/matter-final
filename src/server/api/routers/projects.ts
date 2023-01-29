import { TRPCError } from "@trpc/server";
import {
  newProjectValidator,
  projectSlugValidator,
} from "../../../validators/projects.validators";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newProjectValidator)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project
        .create({
          data: {
            name: input.name,
            slug: input.name.toLowerCase().split(" ").join("-"),
            description: input.description,
          },
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        });
    }),
  getBySlug: protectedProcedure
    .input(projectSlugValidator)
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findFirst({
        where: {
          slug: input.slug,
        },
      });
    }),
});
