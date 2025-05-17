import { z } from "zod";

const createJobValidation = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    requirements: z.array(
      z.string({ required_error: "Requirements are required" })
    ),
    company: z.string({ required_error: "Company is required" }),
  }),
});

const updateJobValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
  }),
});

export const jobValidation = { createJobValidation, updateJobValidation };
