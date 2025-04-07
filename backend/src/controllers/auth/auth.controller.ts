import { Request, Response } from 'express';
import { login } from '../../services/auth';

export const loginController = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  try {
    const token = login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};
