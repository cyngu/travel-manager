import { Router } from 'express';
import { healthcheckController } from '../controllers';

export const healthcheckRouter = Router();

healthcheckRouter.get('', healthcheckController);
