import { z } from "zod";

const createJobValidation = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ required_error: "Description is required" }),
    requirements: z.array(
      z.string({ required_error: "Requirements are required" })
    ),
    company: z.string({ required_error: "Company is required" }),
    // postedBy: z.string({ required_error: "User is required" }),
  }),
});

export const jobValidation = { createJobValidation };
