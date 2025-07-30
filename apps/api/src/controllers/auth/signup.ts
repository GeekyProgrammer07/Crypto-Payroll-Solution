import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../utils/prismaClient';
import { signupSchema } from '@crypto-payroll/types'
import { treeifyError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedInputs = signupSchema.safeParse(req.body);
    if (!parsedInputs.success) {
      const errors = treeifyError(parsedInputs.error);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const { email, password, role, walletAddress } = parsedInputs.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role,
        walletAddress,
      },
    });

    return res.status(201).json({ message: "User created successfully." });

  } catch (err) {
    console.error("Signup error:", err);
    
    if (err instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({ message: "Database error", code: err.code });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: String(err)
    });

  }
};

export default signUp;