import { Router } from 'express';
import { loginController, refreshTokenController, signupController } from '../controllers';
import { validateRequest } from '../middlewares';
import { LoginSchema, SignupSchema } from '../schemas';

export const authRouter = Router();

authRouter.post('/login', validateRequest(LoginSchema), loginController);
authRouter.post('/signup', validateRequest(SignupSchema), signupController);
authRouter.post('/refresh-token', refreshTokenController);
