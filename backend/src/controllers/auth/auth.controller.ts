import { login, signup } from '../../services/auth';
import {
  ApiLoginRequest,
  ApiLoginResponse,
  ApiSignupRequest,
  ApiSignupResponse,
} from '../../schemas/authSchemas';

export const loginController = async (
  req: ApiLoginRequest,
  res: ApiLoginResponse,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const token = await login(email, password);
    res.json({ success: true, data: { token } });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: (e as Error).message,
    });
  }
};

export const signupController = async (
  req: ApiSignupRequest,
  res: ApiSignupResponse,
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const token = await signup(email, password, name);
    res.json({ success: true, data: { token } });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: (e as Error).message,
    });
  }
};
