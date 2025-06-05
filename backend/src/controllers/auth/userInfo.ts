import { Response } from "express";
import { AuthRequest } from "../../types/authRequestInterface";
import prisma from "../../utils/prismaClient";

const userInfo = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user?.email
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                session: {
                    select: {
                        token: true,
                        expiresAt: true
                    }
                }
            }
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export default userInfo;
