import { Request, Response } from 'express';

export const healthcheckController = (_req: Request, res: Response): void => {
  res.json({ status: 'OK' });
};
