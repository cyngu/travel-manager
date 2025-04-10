import bcrypt from 'bcryptjs';
import { AuthTokens, createToken, prisma, verifyToken } from '../../utils';

export const login = async (email: string, password: string): Promise<AuthTokens> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = createToken(user.id, user.name, user.email);

  return token;
};

export const signup = async (
  email: string,
  password: string,
  name: string,
): Promise<AuthTokens> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error('Account already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = createToken(user.id, user.name, user.email);

  return token;
};

export const refreshAccessToken = (refreshToken: string): string => {
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  try {
    const { id, name, email } = verifyToken(refreshToken);
    const { accessToken } = createToken(id, name, email);

    return accessToken;
  } catch (e) {
    throw e;
  }
};
