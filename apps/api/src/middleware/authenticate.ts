import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authRequestInterface';
import { get } from '@crypto-payroll/config';
import jwt from 'jsonwebtoken';
import { tokenInterface } from '../types/tokenInterface';



const environment = 'default';
const currentConfig = get(environment);

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token!, currentConfig.SECRET!) as tokenInterface;

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      walletAddress: decoded.walletAddress ?? null,
    };

    return next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(403).json({
      message: 'Forbidden: Invalid or expired token'
    });
  }
};
