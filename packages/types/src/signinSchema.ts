import { z } from "zod";

export const signinSchema = z.object({
  email: z.email({ message: "Email Format is Incorrect" }).trim(),
  password: z.string().min(5).max(12)
});

export type SigninInput = z.infer<typeof signinSchema>;
