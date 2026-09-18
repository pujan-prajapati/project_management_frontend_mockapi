import * as z from "zod";

export const registerFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters long."),
});
