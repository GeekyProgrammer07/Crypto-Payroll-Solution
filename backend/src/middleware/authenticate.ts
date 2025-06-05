import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { get } from '../config/config';
import { AuthRequest } from '../types/authRequestInterface';

const environment = 'default';
const currentConfig = get(environment);

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction):any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, currentConfig.SECRET!) as { email: string };
    req.user = { email: decoded.email };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};
