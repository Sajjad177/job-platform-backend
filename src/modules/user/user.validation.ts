import { z } from "zod";
import validator from "validator";

const nameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: "First name cannot be less than 3 characters" })
    .max(20, { message: "First name cannot be more than 20 characters" })
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: "{VALUE} is not a valid first name" }
    ),
  middleName: z.string().trim().max(20).optional(),
  lastName: z
    .string()
    .trim()
    .max(20, { message: "Last name cannot be more than 20 characters" })
    .refine((value) => validator.isAlpha(value), {
      message: "{VALUE} is not a valid last name",
    }),
});

const registerValidationSchema = z.object({
  body: z.object({
    name: nameValidationSchema,
    email: z.string({
      required_error: "Email is required",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
});

export const userValidationSchema = {
  registerValidationSchema,
};
