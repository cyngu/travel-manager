import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface DecodedToken extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

export const createToken = (id: string, name: string, email: string): AuthTokens => {
  const accessToken = jwt.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );

  const refreshToken = jwt.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' },
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): DecodedToken => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as DecodedToken;

  if (!decoded) {
    throw new Error('Invalid refresh token');
  }

  return decoded;
};
