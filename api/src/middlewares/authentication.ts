import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { STATUS_CODE } from '../enums/status.enum';
import { PrismaClient } from '../generated/prisma';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

const authentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      code: STATUS_CODE.UNAUTHORIZED,
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        code: STATUS_CODE.UNAUTHORIZED,
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      code: STATUS_CODE.UNAUTHORIZED,
      message: 'Invalid or expired token',
    });
  }
};

export default authentication;
