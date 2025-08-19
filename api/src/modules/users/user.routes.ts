import express from 'express';
import { validateZod } from '../../middlewares/validate';
import { userController } from './user.controller';
import { userSchema } from './user.dto';
import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post(
  '/',
  authentication,
  validateZod(userSchema),
  userController.create
);

export default router;
