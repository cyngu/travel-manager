import { Request, Response } from 'express';

export const healthcheckController = (req: Request, res: Response): void => {
  res.json({ status: 'OK' });
};
