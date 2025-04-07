import bcrypt from 'bcryptjs';
import { createToken, prisma } from '../../utils';

export const login = async (email: string, password: string): Promise<string> => {
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

export const signup = async (email: string, password: string, name: string): Promise<string> => {
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
