import { z } from "zod";

const applyApplicationValidation = z.object({
  body: z.object({
    jobId: z.string({ required_error: "Job ID is required" }),
  }),
});

export const applicationValidationSchema = {
  applyApplicationValidation,
};
