import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { STATUS_CODE } from '../../enums/status.enum';
import { userService } from './user.service';

dotenv.config();

export const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const userData = req.body;

      const emailExists = await userService.uniqueEmailCheck(userData.email);
      if (emailExists) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.CONFLICT,
          message: 'Email already exists',
        });
      }

      const passwordHash = await bcryptjs.hash(
        userData.password,
        Number(process.env.SALT)
      );

      delete userData.confirm_password;
      const newUser = await userService.create({
        ...userData,
        password: passwordHash,
      });

      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.CREATED,
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'User creation failed',
      });
    }
  },
};
