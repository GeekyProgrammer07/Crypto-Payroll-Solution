import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().trim().email({ message: "Email Format is Incorrect" }),
  password: z.string().min(5).max(12)
});

export type SignupInput = z.infer<typeof signinSchema>;
