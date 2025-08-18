import { Request, Response } from 'express';
import { STATUS_CODE } from '../../enums/status.enum';
import authService from './auth.service';
import User from '../../interfaces/user';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const user = await authService.register(req.body);
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Registration successful',
        data: user,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Registration failed',
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Login successful',
        data,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Login failed',
      });
    }
  },

  getMe: async (req: Request & { user: User }, res: Response) => {
    try {
      const user = await authService.getMe(req?.user?.id);
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'User information retrieved successfully',
        data: user,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Failed to retrieve user information',
      });
    }
  },
};

export default authController;
