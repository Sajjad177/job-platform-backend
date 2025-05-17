import { z } from "zod";

const createPaymentValidationSchema = z.object({
  body: z.object({
    jobId: z.string({ required_error: "Job ID is required" }),
  }),
});

export const paymentValidationSchema = {
  createPaymentValidationSchema,
};