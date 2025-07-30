import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/authRequestInterface';
import prisma from '../utils/prismaClient';
import { get } from '@crypto-payroll/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  email: string;
  role: string;
}

const environment = 'default';
const currentConfig = get(environment);

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedRaw = jwt.verify(token!, currentConfig.SECRET!);

    if (typeof decodedRaw !== 'object' || !decodedRaw) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    const decoded = decodedRaw as DecodedToken;

    if (!decoded.email || !decoded.role) {
      return res.status(403).json({ message: 'Forbidden: Missing token fields' });
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = {
      id: user.id,
      email: decoded.email,
      role: decoded.role,
      walletAddress: user.walletAddress
    };

    return next();

  } catch (err) {
    console.error("Auth error:", err);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};
