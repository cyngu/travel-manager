import { Router } from 'express';
import { loginController, signupController } from '../controllers';
import { validateRequest } from '../middlewares';
import { LoginSchema, SignupSchema } from '../schemas';

export const authRouter = Router();

authRouter.post('/login', validateRequest(oginSchema), loginController);
authRouter.post('/signup', validateRequest(SignupSchema), signupController);
