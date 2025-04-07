import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validateRequest<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ issues: result.error.errors });
      return;
    }

    req.body = result.data as z.infer<T>;
    next();
    return;
  };
}
