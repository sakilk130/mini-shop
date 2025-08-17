import { email, z } from 'zod';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../generated/prisma';
import { registerSchema } from './auth.dto';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

const authService = {
  register: async (userData: z.infer<typeof registerSchema>) => {
    try {
      const exitingUser = await prisma.users.findUnique({
        where: { email: userData.email },
      });

      if (exitingUser) {
        throw new Error('User already exists');
      }

      console.log(Number(process.env.SALT));
      const hashedPassword = await bcryptjs.hash(
        userData.password,
        Number(process.env.SALT)
      );

      console.log(hashedPassword);

      const user = await prisma.users.create({
        data: { ...userData, password: hashedPassword },
      });

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      console.log('Error occurred during registration:', error);
      throw new Error('Registration failed: ' + (error as Error).message);
    }
  },
};

export default authService;
