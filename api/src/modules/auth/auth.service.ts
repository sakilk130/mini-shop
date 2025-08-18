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
      const hashedPassword = await bcryptjs.hash(
        userData.password,
        Number(process.env.SALT)
      );
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
        access_token: token,
      };
    } catch (error) {
      console.log('Error occurred during registration:', error);
      throw new Error('Registration failed: ' + (error as Error).message);
    }
  },

  login: async (email: string, password: string) => {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      if (!user.status) {
        throw new Error('Your account is not active');
      }

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
        access_token: token,
      };
    } catch (error) {
      throw new Error('Login failed: ' + (error as Error).message);
    }
  },

  getMe: async (userId: number) => {
    try {
      const user = await prisma.users.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw new Error(
        'Failed to retrieve user information: ' + (error as Error).message
      );
    }
  },
};

export default authService;
