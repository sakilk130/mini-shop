import express from 'express';
import authController from './auth.controller';
import { validateZod } from '../../middlewares/validate';
import { loginSchema, registerSchema } from './auth.dto';

const router = express.Router();

router.post('/register', validateZod(registerSchema), authController.register);
router.post('/login', validateZod(loginSchema), authController.login);

export default router;
