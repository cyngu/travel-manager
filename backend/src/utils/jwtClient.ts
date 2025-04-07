import jwt from 'jsonwebtoken';

export const createToken = (id: string, name: string, email: string): string => {
  return jwt.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );
};
