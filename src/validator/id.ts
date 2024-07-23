import { z } from "zod";

export const idSchema = z.object({
  id: z.number().int().positive(),
});

export type Id = z.infer<typeof idSchema>;
