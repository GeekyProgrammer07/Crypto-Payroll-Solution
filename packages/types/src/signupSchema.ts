import { z } from "zod";

export const signupSchema = z.object({
  email: z.email({ message: "Email Format is Incorrect" }).trim(),
  password: z.string().min(5),
  role: z.enum(["USER", "ADMIN"]),
  walletAddress: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
