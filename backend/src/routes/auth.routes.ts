import { Router } from 'express';
import { loginController, signupController } from '../controllers';
import { validateRequest } from '../middlewares';
import { loginSchema } from '../schemas';

export const authRouter = Router();

authRouter.post('/login', validateRequest(loginSchema), loginController);
authRouter.post('/signup', signupController);
