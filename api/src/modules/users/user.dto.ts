import z from 'zod';
import { ROLE } from '../../enums/role.enum';

export const userSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
    confirm_password: z.string().min(6).max(100),
    role: z.enum(ROLE).default(ROLE.CUSTOMER),
    status: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords must match',
    path: ['confirm_password'],
  });
