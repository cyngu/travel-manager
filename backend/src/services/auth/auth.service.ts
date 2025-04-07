import jwt from 'jsonwebtoken';

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
