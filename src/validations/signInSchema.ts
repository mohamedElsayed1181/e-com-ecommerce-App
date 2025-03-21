import { z } from "zod";

type signInType = z.infer<typeof signInSchema>;
const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Email is required" }),
});

export { signInSchema, type signInType };
