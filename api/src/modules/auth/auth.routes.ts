import express from 'express';
import authController from './auth.controller';
import { validateZod } from '../../middlewares/validate';
import { loginSchema, registerSchema } from './auth.dto';
import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post('/register', validateZod(registerSchema), authController.register);
router.post('/login', validateZod(loginSchema), authController.login);
router.get(
  '/me',
  authentication,
  authController.getMe as unknown as express.RequestHandler
);

export default router;
