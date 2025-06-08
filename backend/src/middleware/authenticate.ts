import { Response, NextFunction } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import { get } from '../config/config';
import { AuthRequest } from '../types/authRequestInterface';
import prisma from '../utils/prismaClient';

const environment = 'default';
const currentConfig = get(environment);

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction):Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, currentConfig.SECRET!) as { email: string, role: string };
    const response = await prisma.user.findUnique({
      where:{
        email: decoded.email
      }
    })
    req.user = { id: response?.id!, email: decoded.email, role: decoded.role, walletAddress: response?.walletAddress };
    return next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};
