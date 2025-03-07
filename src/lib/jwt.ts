import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET! || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
};