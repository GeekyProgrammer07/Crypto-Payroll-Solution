import { Response } from "express";
import prisma from "../../utils/prismaClient";
import { AuthRequest } from "../../types/authRequestInterface";

const userInfo = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.user?.email
            },
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export default userInfo;
