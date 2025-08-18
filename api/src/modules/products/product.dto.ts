import z from 'zod';

export const productSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  price: z.number().min(0.01),
  stock: z.number().int().nonnegative(),
  status: z.boolean().default(true),
  category_id: z.number().min(1),
});
