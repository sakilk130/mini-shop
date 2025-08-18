import z from 'zod';

export const createCategory = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  status: z.boolean().default(true),
});
