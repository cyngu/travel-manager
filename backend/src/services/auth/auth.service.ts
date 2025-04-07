import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../../utils';

const users = [
  { id: 1, email: 'admin@example.com', password: 'password', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'password', role: 'user' },
];

export const login = (email: string, password: string): string => {
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );

  return token;
};

export const signup = async (email: string, password: string, name: string): Promise<any> => {
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

  return user;
};
