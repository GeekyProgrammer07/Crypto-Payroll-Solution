import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { signinSchema } from '../../types/signinSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { get } from '../../config/config';

const prisma = new PrismaClient();
const environment = 'default';
const currentConfig = get(environment);

export const signIn = async (req: Request, res: Response): Promise<any> => {
    const parsedInputs = signinSchema.safeParse(req.body);
    if (!parsedInputs.success) {
        const errors = parsedInputs.error.flatten();
        return res.status(400).json({ errors });
    }

    const { email, password } = parsedInputs.data;

    try {
        const user = await prisma.user.findUniqueOrThrow({ where: { email } });
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const existingSession = await prisma.session.findUnique({
            where: { userId: user.id }
        });

        const token = jwt.sign({
            email: user.email,
            role: user.role,
        }, currentConfig.SECRET!, {
            noTimestamp: true,
            expiresIn: '1h',
        });

        const newExpiry = new Date(Date.now() + 60 * 60 * 1000);

        if (existingSession) {
            if (existingSession.expiresAt > new Date()) {
                return res.status(200).json({
                    message: "Already logged in",
                    token: `Bearer ${existingSession.token}`
                });
            } else {
                await prisma.session.update({
                    where: { userId: user.id },
                    data: {
                        token,
                        expiresAt: newExpiry
                    }
                });
            }
        } else {
            await prisma.session.create({
                data: {
                    userId: user.id,
                    token,
                    expiresAt: newExpiry
                }
            });
        }

        res.status(200).json({
            message: "Logged in successfully",
            token: `Bearer ${token}`
        });

    } catch (error: any) {
        if (error.message?.includes("NotFound")) {
            return res.status(400).json({ message: "Username not found" });
        }
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export default signIn;
