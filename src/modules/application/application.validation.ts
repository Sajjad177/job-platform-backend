import { z } from "zod";

const applyApplicationValidation = z.object({
  body: z.object({
    jobId: z.string({ required_error: "Job ID is required" }),
  }),
});

const updateApplicationStatusValidation = z.object({
  body: z.object({
    status: z.enum(["pending", "accepted", "rejected"]),
  }),
});

export const applicationValidationSchema = {
  applyApplicationValidation,
  updateApplicationStatusValidation,
};
