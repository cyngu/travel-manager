import { Request, Response } from 'express';
import { login, signup } from '../../services/auth';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const token = await login(email, password); // await needed here!
  res.json({ token });
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

// async function test() {
//   login("user@example.com", "secret"); // ✅ ESLint error
// }
