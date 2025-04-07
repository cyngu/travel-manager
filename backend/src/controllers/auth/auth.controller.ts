import { Request, Response } from 'express';
import { login, signup } from '../../services/auth';

export const loginController = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  try {
    const token = login(email, password);
    res.json({ token });
  } catch (e) {
    res.status(401).json({ message: (e as Error).message });
  }
};

export const signupController = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const user = await signup(email, password, name);
    res.json({ user });
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};
