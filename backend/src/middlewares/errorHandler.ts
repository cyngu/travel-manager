import { NextFunction, Request, Response } from 'express';
import { pino } from 'pino';

const logger = pino();

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err, 'An error occurred');
  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
};
