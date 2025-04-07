import { NextFunction, Request, Response } from 'express';
import { pino } from 'pino';

const logger = pino();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err, 'An error occurred');
  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
};
