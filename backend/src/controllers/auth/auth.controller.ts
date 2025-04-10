import { login, signup, refreshAccessToken } from '../../services/auth';
import {
  ApiLoginRequest,
  ApiLoginResponse,
  ApiSignupRequest,
  ApiSignupResponse,
  ApiRefreshTokenResponse,
  ApiRefreshTokenRequest,
} from '../../schemas/authSchemas';

export const loginController = async (
  req: ApiLoginRequest,
  res: ApiLoginResponse,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await login(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, data: { token: accessToken } });
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
    const { accessToken, refreshToken } = await signup(email, password, name);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, data: { token: accessToken } });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: (e as Error).message,
    });
  }
};

export const refreshTokenController = (
  req: ApiRefreshTokenRequest,
  res: ApiRefreshTokenResponse,
): void => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ success: false, message: 'Refresh token is missing' });
  }

  try {
    const accessToken = refreshAccessToken(refreshToken);
    res.json({ success: true, data: { accessToken } });
  } catch {
    res.status(403).json({ success: false, message: 'Invalid refresh token' });
  }
};
