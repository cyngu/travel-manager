import { Request, Response, NextFunction } from 'express';
import { pino } from 'pino';

const logger = pino();

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err, 'An error occurred');
  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};