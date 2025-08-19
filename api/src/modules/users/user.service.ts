import z from 'zod';
import { userSchema } from './user.dto';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const userService = {
  create: async (userData: z.infer<typeof userSchema>) => {
    try {
      const newUser = await prisma.users.create({
        data: userData,
      });
      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        status: newUser.status,
      };
    } catch (error: any) {
      throw new Error(error?.message || 'User creation failed');
    }
  },

  uniqueEmailCheck: async (email: string) => {
    try {
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });
      return existingUser ? true : false;
    } catch (error) {
      throw new Error('Email check failed: ' + (error as Error).message);
    }
  },
};
