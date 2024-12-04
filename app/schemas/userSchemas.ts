import { z } from "zod";

export const PasswordSchema = z.object({
  first: z.string().min(6, "Password must be at least 6 characters"),
  second: z.string(),
}).refine((data) => data.first === data.second, {
  message: "Passwords do not match",
  path: ["second"],
});

export const FormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  confirmEmail: z.string().email("Invalid email address").refine((val, ctx) => {
    if (val !== ctx.parent.email) {
      return false;
    }
    return true;
  }, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  }),
  phoneNumber: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
  plainPassword: PasswordSchema,
  gender: z.enum(["male", "female", "other"], "Gender is required"),
  birthdate: z.string().min(1, "Birthdate is required"),
  trainingPlace: z.string().min(1, "Training place is required"),
  height: z.number().positive("Height must be a positive number"),
  weight: z.number().positive("Weight must be a positive number"),
});
