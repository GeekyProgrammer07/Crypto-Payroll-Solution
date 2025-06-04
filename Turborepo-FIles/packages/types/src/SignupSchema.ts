import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().trim().email({ message: "Email Format is Incorrect" }),
  password: z.string().min(5).max(12),
  role: z.enum(["USER", "ADMIN"]),
  walletAddress: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
