import { z } from "zod";

export const newProjectValidator = z.object({
  name: z.string(),
  description: z.string(),
});

export type IProjectValidator = z.infer<typeof newProjectValidator>;

export const projectSlugValidator = z.object({
  slug: z.string(),
});

export type IProjectSlugValidator = z.infer<typeof projectSlugValidator>;
