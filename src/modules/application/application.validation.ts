import { z } from "zod";

const applyApplicationValidation = z.object({
  body: z.object({
    jobId: z.string({ required_error: "Job ID is required" }),
    cv: z.string().optional(),
    resume: z.string().optional(),
    invoice: z.object({
      id: z.string({ required_error: "Invoice ID is required" }),
      user: z.string({ required_error: "User ID is required" }),
      amount: z.number({ required_error: "Amount is required" }),
      time: z.date({ required_error: "Time is required" }),
    }),
  }),
});

export const applicationValidationSchema = {
  applyApplicationValidation,
};
