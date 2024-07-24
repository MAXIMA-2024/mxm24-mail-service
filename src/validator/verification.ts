import { z } from "zod";

export const verificationSchema = z.object({
  role: z.enum(["panitia", "organisator"]),
  id: z.number().int().positive(),
});

export type VerificationSchema = z.infer<typeof verificationSchema>;
