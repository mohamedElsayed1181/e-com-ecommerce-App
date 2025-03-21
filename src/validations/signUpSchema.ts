import { z } from "zod";

type signUpType = z.infer<typeof signUpSchema>;
const signUpSchema = z
  .object({
    firistName: z.string().min(1, { message: "First name is required" }),
    secondName: z.string().min(1, { message: "Second name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export { signUpSchema, type signUpType };
