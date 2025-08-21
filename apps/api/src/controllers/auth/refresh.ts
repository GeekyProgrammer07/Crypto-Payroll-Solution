import { get } from "@crypto-payroll/config";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import prisma from "../../utils/prismaClient";
import { refreshTokenInterface } from "../../types/tokenInterface";
import { currentConfig } from "../..";

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    };

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, currentConfig.REFRESH_SECRET!) as refreshTokenInterface;
    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    const session = await prisma.session.findUnique({
        where: {
            userId: decoded.id!
        },
        include: {
            user: true
        }
    });

    if (!session || session.refreshToken !== refreshToken) {
        return res.status(403).json({
            message: "Token mismatch"
        })
    }

    if (session.expiresAt < new Date()) {
        return res.status(403).json({
            message: "Refresh token expired"
        });
    }

    const newAccessToken = jwt.sign({
        sub: session.userId,
        iss: "crypto-payroll",
        aud: "crypto-payroll-api",
        email: session.user.email,
        role: session.user.role,
    }, currentConfig.SECRET!, {
        expiresIn: '15m'
    });

    return res.status(200).json({
        accessToken: `Bearer ${newAccessToken}`
    });
}