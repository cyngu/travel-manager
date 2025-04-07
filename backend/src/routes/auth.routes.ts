import { Router } from 'express';
import { loginController } from '../controllers';

export const authRouter = Router();

authRouter.post('/auth/login', loginController);
