import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prismaClient';
import { get } from '@crypto-payroll/config';
import { signinSchema } from '@crypto-payroll/types';
import { z } from 'zod';

const environment = 'default';
const currentConfig = get(environment);

const signIn = async (req: Request, res: Response): Promise<any> => {
  const parsedInputs = signinSchema.safeParse(req.body);
  if (!parsedInputs.success) {
    const errors = z.treeifyError(parsedInputs.error);
    return res.status(400).json({ errors });
  }

  const { email, password } = parsedInputs.data;

  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        sub: user.id,
        iss: "crypto-payroll",
        aud: "crypto-payroll-api",
        email: user.email,
        role: user.role,
      },
      currentConfig.SECRET!,
      { expiresIn: '15m' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      currentConfig.REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    await prisma.session.upsert({
      where: { userId: user.id },
      update: {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Logged in successfully',
      accessToken,
      tokenType: 'Bearer'
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export default signIn;
