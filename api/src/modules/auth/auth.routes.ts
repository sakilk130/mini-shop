import express from 'express';
import authController from './auth.controller';
import { validateZod } from '../../middlewares/validate';
import { registerSchema } from './auth.dto';

const router = express.Router();

router.post('/register', validateZod(registerSchema), authController.register);

export default router;
