import { z } from "zod";

const createCompanyValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    website: z.string({ required_error: "Website is required" }),
    industry: z.string({ required_error: "Industry is required" }),
    employees: z.array(z.string({ required_error: "Employees are required" })),
  }),
});

export const companyValidation = { createCompanyValidation };
