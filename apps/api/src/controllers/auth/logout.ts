import { AuthRequest } from "../../types/authRequestInterface";
import { Response } from "express";
import prisma from "../../utils/prismaClient";

export const logOut = async (req: AuthRequest, res: Response): Promise<any> => {
  try {

    await prisma.session.delete({
      where: {
        userId: req.user?.id,
      },
    });

    return res.status(200).json({ 
        message: "Logged out successfully" 
    });
    
  } catch (error) {
    console.error("Logout error: ", error);
    return res.status(500).json({
      message: "Internal server error during logout",
    });
  }
};
