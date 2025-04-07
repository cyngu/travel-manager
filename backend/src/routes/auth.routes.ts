import { Router } from 'express';
import { loginController, signupController } from '../controllers';

export const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/signup', signupController);
